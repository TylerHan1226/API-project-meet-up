const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue, Event, EventImage, Attendance } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth')

// //confirming route
// router.use((req, res, next) => {
//     console.log('Attendance route hit!');
//     next();
// });



//Get all Attendees of an Event specified by its id
router.get('/:eventId/attendees', async (req, res) => {
    const { eventId } = req.params
    const { user } = req
    const users = await User.findAll({
        include: [{
            model: Attendance, attributes: ['status'], include: [{
                model: Event, where: { id: eventId }, attributes: ['id'], include: [{ model: Group, attributes: ['organizerId'], include: { model: Membership, attributes: ['userId', 'status'] } }]
            }]
        }]
    }) //=> returning all users

    //error handler
    const event = await Event.findByPk(eventId)
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    //filter the users in the attendance sheet
    const attendees = users.filter(ele => ele.Attendances.length !== 0)
    //error handler
    if (attendees.length === 0) {
        return res.status(200).json({
            "message": "Event has no attendee"
        })
    }

    const attArr = []
    const hosts = []
    hosts.push(attendees[0].Attendances[0].Event.Group.organizerId)
    attendees.forEach(ele => {
        attArr.push(ele.toJSON())
    })
    attArr.forEach(ele => {
        //make hosts list
        ele.Attendances[0].Event.Group.Memberships.forEach(mEle => {
            if (['co-host'].includes(mEle.status)) {
                hosts.push(mEle.userId)
            }
        })
        //add Attendance status
        ele.Attendance = { status: ele.Attendances[0].status }
        delete ele.Attendances
    })
    //If you ARE the organizer of the group or a member of the group with a status of "co-host", shows all attendees including those with a status of "pending". If NOT. Shows all members that don't have a status of pending
    if (hosts.includes(user.id)) {
        return res.status(200).json({ Attendees: attArr })
    } else {
        const reAttArr = attArr.filter(ele => ele.Attendance.status !== 'pending')
        return res.status(200).json({ Attendees: reAttArr })
    }
})



//Request to Attend an Event based on the Event's id
router.post('/:eventId/attendance', requireAuth, async (req, res) => {
    const { eventId } = req.params
        const { user } = req
        const event = await Event.findByPk(eventId, {
            include: [
                { model: Attendance, attributes: ['userId', 'status'] },
                { model: Group, attributes: ['organizerId'], include: [
                    { model: Membership, attributes: ['userId', 'status'] }
                ] }
            ]
        })
        // Error handler
        if (!event) {
            return res.status(404).json({
                "message": "Event couldn't be found"
            })
        }
        // Current User must be a member of the group
        const validUser = event.Group.Memberships.filter(ele =>
            ele.userId == user.id && ['host', 'co-host', 'member'].includes(ele.status)
        )
        if (validUser.length === 0) {
            return res.status(403).json({
                "message": "Current User must be a member of the group"
            })
        }
        // Check attendance
        const userId = user.id;
        event.Attendances.forEach(ele => {
            if (userId == ele.userId) {
                if (ele.status == 'pending') {
                    return res.status(400).json({
                        "message": "Attendance has already been requested"
                    })
                } else if (ele.status == 'attending') {
                    return res.status(400).json({
                        "message": "User is already an attendee of the event"
                    })
                }
                //Break out of the loop after finding a match
                return
            }
        })
        // Build and save new attendance
        const status = 'pending'
        const newAttendee = await Attendance.build({
            eventId, userId, status
        })
        await newAttendee.save()

        const reNewAtt = {
            userId: newAttendee.userId,
            status: newAttendee.status
        }
        return res.status(200).json(reNewAtt)
})



//Change the status of an attendance for an event specified by id
router.put('/:eventId/attendance', requireAuth, async (req, res) => {
    const { eventId } = req.params
    const { user } = req
    const { userId, status } = req.body
    const event = await Event.findByPk(eventId, {
        include: [
            {
                model: Group, attributes: ['id', 'organizerId'], include: [
                    { model: Membership, attributes: ['userId', 'status'] }
                ]
            },
            { model: Attendance }
        ]
    })

    //error handlers
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    const attUser = await User.findByPk(userId)
    if (!attUser) {
        return res.status(404).json({
            "message": "User couldn't be found"
        })
    }
    if (status == 'pending') {
        return res.status(400).json({
            "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
            "errors": {
                "status": "Cannot change an attendance status to pending"
            }
        })
    }
    const member = event.Attendances.filter(ele => ele.userId == userId)
    if (member.length == 0) {
        return res.status(404).json({
            "message": "Attendance between the user and the event does not exist"
        })
    }
    // Current User must already be the organizer or have a membership to the group with the status of 'co-host'
    const hosts = []
    hosts.push(event.Group.organizerId)
    event.Group.Memberships.forEach(ele => {
        if (['co-host'].includes(ele.status)) {
            hosts.push(ele.userId)
        }
    })
    if (!hosts.includes(user.id)) {
        return res.status(403).json({
            "message": "Current User must already be the organizer or have a membership to the group with the status of 'co-host'"
        })
    }
    //update
    const attToUpdate = await Attendance.findOne({
        where: { userId: userId, eventId: eventId }
    })
    attToUpdate.status = status
    await attToUpdate.save()
    const ReAttendee = attToUpdate.get({ plain: true })
    delete ReAttendee.createdAt
    delete ReAttendee.updatedAt

    return res.status(200).json(ReAttendee)
})



//Delete attendance to an event specified by id
router.delete('/:eventId/attendance/:userId', requireAuth, async (req, res) => {
    const { eventId, userId } = req.params
    const { user } = req
    const event = await Event.findByPk(eventId, {
        include: [
            {
                model: Group, attributes: ['id', 'organizerId'], include: [
                    { model: Membership, attributes: ['userId', 'status'] }
                ]
            },
            { model: Attendance }
        ]
    })
    //error handlers
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    const attUser = await User.findByPk(userId)
    if (!attUser) {
        return res.status(404).json({
            "message": "User couldn't be found"
        })
    }
    if (event.Group.organizerId != user.id && userId != user.id) {
        return res.status(403).json({
            "message": "Current User must be the host of the group, or the user whose attendance is being deleted"
        })
    }
    //delete
    const attending = 'attending'
    const attendee = await Attendance.findOne({
        where: { userId: userId, eventId: eventId, status: attending }
    })
    const members = event.Attendances
    const member = members.filter(ele => ele.userId == userId)
    if (member.length == 0 || !attendee) {
        return res.status(404).json({
            "message": "Attendance between the user and the event does not exist"
        })
    }
    await attendee.destroy()

    return res.status(200).json({
        "message": "Successfully deleted attendance from event"
    })
})



module.exports = router;