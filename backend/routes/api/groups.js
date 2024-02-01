const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth');
const groupValidation = require('../../input-validation/groupValidation');


//confirming route
router.use((req, res, next) => {
    console.log('Group route hit!');
    next();
});


//Get all Groups
router.get('/', async (req, res) => {
    //get groups
    const groups = await Group.findAll({
        include: [
            { model: GroupImage, attributes: ['url', 'preview'] },
            { model: Membership, attributes: ['id', 'groupId'] }
        ]
    })

    //create result array
    const reGroups = []
    for (let eachGroup of groups) {
        reGroups.push(eachGroup.toJSON())
    }
    for (let eachRGroup of reGroups) {
        //numMembers
        eachRGroup.numMembers = 1
        if (eachRGroup.Memberships.length !== 0) {
            eachRGroup.numMembers = eachRGroup.Memberships.length
        }
        delete eachRGroup.Memberships
        //previewImage
        eachRGroup.previewImage = null
        for (let eachImg of eachRGroup.GroupImages) {
            if (eachImg.preview == true) {
                const previewImage = eachImg.url
                eachRGroup.previewImage = previewImage
            }
        }
        eachRGroup.createdAt = eachRGroup.createdAt.toISOString().split('T')[0] + " " + eachRGroup.createdAt.toISOString().split('T')[1].split('.')[0]
        eachRGroup.updatedAt = eachRGroup.updatedAt.toISOString().split('T')[0] + " " + eachRGroup.updatedAt.toISOString().split('T')[1].split('.')[0]
        delete eachRGroup.GroupImages
    }

    return res.status(200).json({ Groups: reGroups })
})


//Get all Groups joined or organized by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const groups = await Group.findAll({
        include: [
            { model: GroupImage, attributes: ['url'], where: { preview: true } },
            { model: Membership, attributes: ['id', 'userId', 'groupId'] }
        ]
    })

    //building response
    const reGroups = []
    groups.forEach(ele => {
        //checking memberships
        // return res.status(200).json(ele.organizerId)
        if (ele.Memberships.length !== 0) {
            let UserIdArr = ele.Memberships.map(ele => ele.userId)
            if (UserIdArr.includes(user.id)) {
                reGroups.push(ele.toJSON())
            }
            //checking organizerId
        } else if (ele.organizerId == user.id) {
            //checking duplicated groups
            if (reGroups.length > 1) {
                const reGroupsIdArr = reGroups.map(ele => ele.id)
                if (!reGroupsIdArr.includes(ele.id)) {
                    reGroups.push(ele.toJSON())
                }
            } else {
                reGroups.push(ele.toJSON())
            }
        }
    })

    reGroups.forEach(ele => {
        if (ele.Memberships.length !== 0) {
            ele.numMembers = ele.Memberships.length
        } else {
            ele.numMembers = 1
        }
        if (ele.GroupImages) {
            ele.previewImage = ele.GroupImages[0].url
        } else {
            ele.previewImage = null
        }
        ele.createdAt = ele.createdAt.toISOString().split('T')[0] + " " + ele.createdAt.toISOString().split('T')[1].split('.')[0]
        ele.updatedAt = ele.updatedAt.toISOString().split('T')[0] + " " + ele.updatedAt.toISOString().split('T')[1].split('.')[0]
        delete ele.Memberships
        delete ele.GroupImages
    })

    return res.status(200).json({ Groups: reGroups })
})


// Get details of a Group from an id
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params
    const group = await Group.findOne({
        where: { id: groupId },
        include: [
            { model: GroupImage, attributes: ['id', 'url', 'preview'] },
            { model: Membership, attributes: ['id', 'groupId'] },
            { model: User, as: 'Organizer', attributes: ['id', 'firstName', 'lastName'] },
            { model: Venue }
        ]
    })
    //Group couldn't be found
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    const resultGroup = group.toJSON()
    resultGroup.numMembers = 1
    if (resultGroup.Memberships.length !== 0) {
        resultGroup.numMembers = resultGroup.Memberships.length
    }
    resultGroup.createdAt = resultGroup.createdAt.toISOString().split('T')[0] + " " + resultGroup.createdAt.toISOString().split('T')[1].split('.')[0]
    resultGroup.updatedAt = resultGroup.updatedAt.toISOString().split('T')[0] + " " + resultGroup.updatedAt.toISOString().split('T')[1].split('.')[0]
    resultGroup.Venues.forEach(ele => {
        ele.lat = parseFloat(ele.lat)
        ele.lng = parseFloat(ele.lng)
    })
    delete resultGroup.Memberships
    return res.status(200).json(resultGroup)
})


// Create a Group
router.post('/', requireAuth, groupValidation.createGroup(), async (req, res) => {
    const { user } = req
    const { name, about, type, private, city, state } = req.body
    const organizerId = user.id
    //Build instance
    const newGroup = await Group.build({
        organizerId, name, about, type, private, city, state
    })
    await newGroup.save()
    const reGroup = newGroup.toJSON()
    reGroup.createdAt = reGroup.createdAt.toISOString().split('T')[0] + " " + reGroup.createdAt.toISOString().split('T')[1].split('.')[0]
    reGroup.updatedAt = reGroup.updatedAt.toISOString().split('T')[0] + " " + reGroup.updatedAt.toISOString().split('T')[1].split('.')[0]
    return res.status(201).json(reGroup);
})


//Add an Image to a Group based on the Group's id
router.post('/:groupId/images', requireAuth, async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    const group = await Group.findByPk(groupId)
    //Group couldn't be found
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    //Current User must be the organizer for the group
    if (group.organizerId !== user.id) {
        return res.status(403).json({
            "message": "Current User must be the organizer for the group"
        })
    }
    //Build Image
    const { url, preview } = req.body
    const newGroupImg = await GroupImage.build({
        groupId, url, preview
    })
    await newGroupImg.save()
    const reNewGroupImg = {
        id: newGroupImg.id,
        url: newGroupImg.url,
        preview: newGroupImg.preview
    }
    return res.status(200).json(reNewGroupImg)
})


//Edit a Group
router.put('/:groupId', requireAuth, groupValidation.createGroup(), async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    const group = await Group.findByPk(groupId)
    //Group couldn't be found
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    //Group must belong to the current user
    if (group.organizerId !== user.id) {
        return res.status(403).json({
            "message": "Group must belong to the current user"
        })
    }
    //Edit
    const { name, about, type, private, city, state } = req.body
    group.name = name
    group.about = about
    group.type = type
    group.private = private
    group.city = city
    group.state = state
    await group.save()
    const reGroup = group.toJSON()
    reGroup.createdAt = reGroup.createdAt.toISOString().split('T')[0] + " " + reGroup.createdAt.toISOString().split('T')[1].split('.')[0]
    reGroup.updatedAt = reGroup.updatedAt.toISOString().split('T')[0] + " " + reGroup.updatedAt.toISOString().split('T')[1].split('.')[0]

    return res.status(200).json(reGroup)
})


//Delete a Group
router.delete('/:groupId', requireAuth, async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    const group = await Group.findByPk(groupId)
    //Group couldn't be found
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    //Group must belong to the current user
    if (group.organizerId !== user.id) {
        return res.status(403).json({
            "message": "Group must belong to the current user"
        })
    }
    //Delete
    await group.destroy()

    return res.status(200).json({
        "message": "Successfully deleted"
    })
})



module.exports = router;