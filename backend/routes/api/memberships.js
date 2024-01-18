const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue, Event, EventImage, Attendance } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth')
// const eventValidation = require('../../input-validation/eventValidation')


//confirming route
router.use((req, res, next) => {
    console.log('Membership route hit!');
    next();
});



//Get all Members of a Group specified by its id
router.get('/:groupId/members', async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    const members = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        include: [
            { model: Membership, attributes: ['userId', 'groupId', 'status'] },
            { model: Group, attributes: ['id', 'organizerId'] }
        ]
    })

    const membersInGroup = []
    for (let eachMember of members) {
        //check if the member is the organizer of the group
        for (let eachGroup of eachMember.Groups) {
            if (eachGroup.id == groupId) {
                membersInGroup.push(eachMember.toJSON())
            }
        }
        //check if the member's membership is related to the group
        for (let eachMembership of eachMember.Memberships) {
            if (eachMembership.groupId == groupId) {
                membersInGroup.push(eachMember.toJSON())
            }
        }
    }
    //error handler
    if (membersInGroup.length == 0) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    //check duplicates
    const uniqueIds = new Set()
    const reMembersInGroup = []
    membersInGroup.map(ele => {
        if (!uniqueIds.has(ele.id)) {
            uniqueIds.add(ele.id)
            reMembersInGroup.push(ele)
        }
    })
    // If you ARE the organizer or a co-host of the group. Shows all members and their statuses.
    // If you ARE NOT the organizer of the group. Shows only members that don't have a status of "pending"
    const hostId = []
    membersInGroup.forEach(ele => {
        // change Memberships arr in eachMember to Membership: {status: xxx}
        let status = 'pending'
        ele.Membership = { status: status }
        if (ele.Memberships.length !== 0) {
            ele.Memberships.forEach(mEle => {
                if (mEle.userId == ele.id && mEle.groupId == groupId) {
                    status = { status: mEle.status }
                }
            })
            ele.Membership = status
        }
        //get organizerId from Group
        ele.Groups.forEach(gEle => {
            if (gEle.id == groupId) hostId.push(gEle.organizerId)
        })
        //get co-host userId from Membership
        ele.Memberships.forEach(mEle => {
            if (['co-host'].includes(mEle.status) && mEle.groupId == groupId) {
                hostId.push(mEle.userId)
            }
        })
        delete ele.Memberships
        delete ele.Groups
    })
    if (!hostId.includes(user.id)) {
        const resultMembers = []
        for (let eachMember of reMembersInGroup) {
            if (eachMember.Membership) {
                if ((eachMember.Membership.status != 'pending')) {
                    resultMembers.push(eachMember)
                }
            }
        }
        return res.status(200).json({ Members: resultMembers })
    }

    return res.status(200).json({ Members: reMembersInGroup })
})



//Request a Membership for a Group based on the Group's id
router.post('/:groupId/membership', requireAuth, async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    //error handler
    const group = await Group.findByPk(groupId)
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    const memberships = await Membership.findAll({
        where: { groupId: groupId }
    })
    //check if the user to update already has a membership related to the group
    let memberToUpdate = {}
    memberships.forEach(ele => {
        if (ele.userId == user.id) {
            memberToUpdate = ele
        }
    })
    if (Object.keys(memberToUpdate).length !== 0) {
        if (memberToUpdate.status == 'pending') {
            return res.status(400).json({
                "message": "Membership has already been requested"
            })
        }
        return res.status(400).json({
            "message": "User is already a member of the group"
        })
    }
    const userId = user.id
    const status = 'pending'
    const newMembership = await Membership.build({
        userId, groupId, status
    })
    await newMembership.save()
    let reNewMembership = {
        memberId: newMembership.userId,
        status: newMembership.status
    }
    return res.status(200).json(reNewMembership)
})


//Change the status of a membership for a group specified by id
router.put('/:groupId/membership', requireAuth, async (req, res) => {
    const { groupId } = req.params
    const { memberId, status } = req.body
    const { user } = req
    //error handlers
    const group = await Group.findByPk(groupId, {
        include: [
            { model: Membership }
        ]
    })
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    const userToUpdate = await User.findByPk(memberId)
    if (!userToUpdate) {
        return res.status(404).json({
            "message": "User couldn't be found"
        })
    }
    const member = await Membership.findOne({
        where: { userId: memberId, groupId: groupId }
    })
    if (!member) {
        return res.status(404).json({
            "message": "Membership between the user and the group does not exist"
        })
    }
    if (status == 'pending') {
        const errObj = {
            "message": "Bad Request",
            "errors": {
                "status": "Cannot change a membership status to pending"
            }
        }
        return res.status(400).json(errObj)
    }
    //authorization
    const hosts = []
    hosts.push(group.organizerId)
    group.Memberships.forEach(ele => {
        if (['co-host'].includes(ele.status)) {
            hosts.push(ele.userId)
        }
    })
    if (status == 'member' && member.status == 'pending') {
        if (hosts.includes(user.id)) {
            //edit member
            member.status = status
            await member.save()
        } else {
            return res.status(403).json({
                "message": "Current User must already be the organizer or have a membership to the group with the status of 'co-host'"
            })
        }
    }
    if (status == 'co-host' && member.status == 'member') {
        if (user.id == group.organizerId) {
            //edit member
            member.status = status
            member.save()
        } else {
            return res.status(403).json({
                "message": "Current User must already be the organizer"
            })
        }
    }

    const reMember = member.get({ plain: true })
    delete reMember.createdAt
    delete reMember.updatedAt
    return res.status(200).json(reMember)
})


//Delete membership to a group specified by id
router.delete('/:groupId/membership/:memberId', requireAuth, async (req, res) => {
    const { groupId, memberId } = req.params
    const { user } = req
    //error handlers
    const group = await Group.findByPk(groupId)
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    const userToUpdate = await User.findByPk(memberId)
    if (!userToUpdate) {
        return res.status(404).json({
            "message": "User couldn't be found"
        })
    }
    const member = await Membership.findOne({
        where: { groupId: groupId, userId: memberId }
    })
    if (!member) {
        return res.status(404).json({
            "message": "Membership does not exist for this User"
        })
    }
    //Current User must be the host of the group, or the user whose membership is being deleted
    if (group.organizerId !== user.id && memberId !== user.id) {
        return res.status(403).json({
            "message": "Current User must be the host of the group, or the user whose membership is being deleted"
        })
    }
    //delete
    await member.destroy()
    return res.status(200).json({
        "message": "Successfully deleted"
    })
})



module.exports = router;