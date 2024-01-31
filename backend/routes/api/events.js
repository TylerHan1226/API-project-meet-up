const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue, Event, EventImage, Attendance } = require('../../db/models');

//Validation middleware
const { requireAuth, restoreUser } = require('../../utils/auth')
const eventValidation = require('../../input-validation/eventValidation')


//confirming route
router.use((req, res, next) => {
    console.log('Event route hit!');
    next();
});



//Get all Events
router.get('/events', async (req, res) => {
    //Query Filters
    let { page, size, name, type, startDate } = req.query
    page = parseInt(page)
    size = parseInt(size)

    //validation
    if (Object.keys(req.query).length) {
        const err = {}
        if (page < 1 || page > 10) err.page = "Page must be greater than or equal to 1 and less than or equal to 10."
        if (size < 1 || size > 20) err.size = "Size must be greater than or equal to 1 and less than or equal to 20."
        if (name && (typeof name !== 'string' || !isNaN(Number(name)))) err.name = "Name must be a string"
        if (type && !['Online', 'In person'].includes(type)) err.type = "Type must be 'Online' or 'In person'"
        if (startDate) {
            const startDateObj = new Date(startDate)
            const currentTime = new Date().getTime();
            if (isNaN(startDateObj.getTime()) || startDateObj < currentTime) {
                err.startDate = "Start date must be a valid date time"
            }
        }
        if (Object.keys(err).length) {
            const validationError = {
                message: "Bad Request",
                errors: err
            };
            return res.status(400).json(validationError);
        }
    }
    //queryObj
    const queryObj = {
        where: {}
    };
    if (name) {
        queryObj.where.name = {
            [Op.substring]: name
        };
    }
    if (type) {
        queryObj.where.type = type;
    }
    if (startDate) {
        if (startDate.split(' ').length == 1) {
            const endTime = new Date(startDate).toISOString().split('T')[0] + ' 24:00:00'
            queryObj.where.startDate = {
                [Op.between]: [startDate, endTime]
            };
        } else {
            queryObj.where.startDate = startDate
        }
    }
    //paginationObj
    let paginationObj = {
        limit: 20,
        offset: 0
    }
    if (size) {
        paginationObj.limit = size;
    }
    if (page && size) {
        paginationObj.offset = size * (page - 1);
    }
    if (page && !size) {
        paginationObj.offset = 20 * (page - 1);
    }
    // return res.json(startDate)
    // return res.json(queryObj)
    //find events
    const events = await Event.findAll({
        attributes: { exclude: ['description', 'capacity', 'price', 'createdAt', 'updatedAt'] },
        include: [
            { model: Attendance },
            { model: EventImage },
            { model: Group, attributes: ['id', 'name', 'city', 'state'] },
            { model: Venue, attributes: ['id', 'city', 'state'] }
        ],
        ...paginationObj,
        ...queryObj
    })
    //construct response
    const reEvents = []
    for (let eachEvent of events) {
        reEvents.push(eachEvent.toJSON())
    }
    for (let eachREvent of reEvents) {
        eachREvent.numAttending = 0
        const attArr = []
        for (let eachAtt of eachREvent.Attendances) {
            if (eachAtt.status == 'attending') {
                attArr.push(eachAtt)
            }
        }
        if (eachREvent.Attendances.length !== 0) {
            eachREvent.numAttending = attArr.length
        }
        eachREvent.previewImage = null
        for (let eachEImg of eachREvent.EventImages) {
            if (eachEImg.preview === true) {
                eachREvent.previewImage = eachEImg.url
            }
        }
        if (eachREvent.Venue.length === 0) {
            eachREvent.Venue = null
        }
        eachREvent.startDate = eachREvent.startDate.toISOString().split('T')[0] + " " + eachREvent.startDate.toISOString().split('T')[1].split('.')[0]
        eachREvent.endDate = eachREvent.endDate.toISOString().split('T')[0] + " " + eachREvent.endDate.toISOString().split('T')[1].split('.')[0]
        delete eachREvent.Attendances
        delete eachREvent.EventImages
    }
    // if (reEvents.length === 0) {
    //     return res.status(200).json({
    //         'message': 'No event found'
    //     })
    // }

    return res.status(200).json({ Events: reEvents })
})



//Get all Events of a Group specified by its id
router.get('/groups/:groupId/events', async (req, res) => {
    const { groupId } = req.params
    const events = await Event.findAll({
        attributes: { exclude: ['description', 'capacity', 'price', 'createdAt', 'updatedAt'] },
        include: [
            { model: Group, attributes: ['id', 'name', 'city', 'state'] },
            { model: Venue, attributes: ['id', 'city', 'state'] },
            { model: Attendance },
            { model: EventImage }
        ]
    })
    
    const reEvents = []
    for (let eachEvent of events) {
        if (eachEvent.Group.id == groupId) {
            reEvents.push(eachEvent.toJSON())
        }
    }
    //error handler
    if (reEvents.length === 0) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }

    for (let eachREvent of reEvents) {
        eachREvent.numAttending = 0
        const attArr = []
        for (let eachAtt of eachREvent.Attendances) {
            if (eachAtt.status == 'attending') {
                attArr.push(eachAtt)
            }
        }
        if (eachREvent.Attendances.length !== 0) {
            eachREvent.numAttending = attArr.length
        }

        eachREvent.previewImage = null
        for (let eachEImg of eachREvent.EventImages) {
            if (eachEImg.preview === true) {
                eachREvent.previewImage = eachEImg.url
            }
        }
        if (eachREvent.Venue.length === 0) {
            eachREvent.Venue = null
        }
        eachREvent.startDate = eachREvent.startDate.toISOString().split('T')[0] + " " + eachREvent.startDate.toISOString().split('T')[1].split('.')[0]
        eachREvent.endDate = eachREvent.endDate.toISOString().split('T')[0] + " " + eachREvent.endDate.toISOString().split('T')[1].split('.')[0]
        delete eachREvent.Attendances
        delete eachREvent.EventImages
    }

    return res.status(200).json({ Events: reEvents })
})



// Get details of an Event specified by its id
router.get('/events/:eventId', async (req, res) => {
    const { eventId } = req.params
    const event = await Event.findByPk(eventId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            { model: Group, attributes: ['id', 'name', 'private', 'city', 'state'] },
            { model: Venue, attributes: { exclude: ['groupId', 'createdAt', 'updatedAt'] } },
            { model: EventImage, attributes: ['id', 'url', 'preview'] },
            { model: Attendance }
        ]
    })
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    let reEvent = event.toJSON()
    reEvent.numAttending = 0
    // return res.json(reEvent.Attendances)
    const attArr = []
    for (let eachAtt of reEvent.Attendances) {
        if (eachAtt.status == 'attending') {
            attArr.push(eachAtt)
        }
    }
    if (reEvent.Attendances.length !== 0) {
        reEvent.numAttending = attArr.length
    }
    if (reEvent.Venue.length === 0) {
        reEvent.Venue = null
    }
    if (reEvent.EventImages.length === 0) {
        reEvent.EventImages = null
    }
    reEvent.startDate = reEvent.startDate.toISOString().split('T')[0] + " " + reEvent.startDate.toISOString().split('T')[1].split('.')[0]
    reEvent.endDate = reEvent.endDate.toISOString().split('T')[0] + " " + reEvent.endDate.toISOString().split('T')[1].split('.')[0]
    delete reEvent.Attendances
    return res.status(200).json(reEvent)
})



// Create an Event for a Group specified by its id
router.post('/groups/:groupId/events', requireAuth, eventValidation.createEvent(), async (req, res) => {
    const { groupId } = req.params
    const { user } = req
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
    //Current User must be the organizer of the group or a member of the group with a status of 'co-host'
    const validUsers = []
    for (let eachMember of group.Memberships) {
        if (eachMember.status == 'host' || eachMember.status == 'co-host') {
            validUsers.push(eachMember)
        }
    }
    const memberIdArr = validUsers.map(ele => ele.userId)
    memberIdArr.push(group.organizerId)
    if (!memberIdArr.includes(user.id)) {
        return res.status(403).json({
            "message": "Current User must be the organizer of the group or a member of the group with a status of 'co-host'"
        })
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body
    const venue = await Venue.findByPk(venueId)
    if (!venue) {
        return res.status(404).json({
            "message": "Venue couldn't be found"
        })
    }
    //build
    const newEvent = await Event.build({
        groupId, venueId, name, type, capacity, price, description, startDate, endDate
    })
    await newEvent.save()

    const reNewEvent = newEvent.get({ plain: true })
    reNewEvent.startDate = reNewEvent.startDate.toISOString().split('T')[0] + " " + reNewEvent.startDate.toISOString().split('T')[1].split('.')[0]
    reNewEvent.endDate = reNewEvent.endDate.toISOString().split('T')[0] + " " + reNewEvent.endDate.toISOString().split('T')[1].split('.')[0]
    delete reNewEvent.createdAt
    delete reNewEvent.updatedAt
    return res.status(200).json(reNewEvent)
})


//Add an Image to an Event based on the Event's id
router.post('/events/:eventId/images', requireAuth, async (req, res) => {
    const { eventId } = req.params
    const { user } = req
    const event = await Event.findByPk(eventId, {
        include: [
            { model: Attendance },
            {
                model: Group, attributes: ['organizerId'], include: [
                    { model: Membership }
                ]
            }
        ]
    })
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }

    //Current User must be an attendee, host, or co-host of the event
    let validUsers = []
    validUsers.push(event.Group.organizerId)
    //checking attendance
    if (event.Attendances.length !== 0) {
        for (let eachAtt of event.Attendances) {
            if (eachAtt.status == 'attending') {
                validUsers.push(eachAtt.userId)
            }
        }
    }
    //checking host / co-host
    const validMembers = event.Group.Memberships.filter(member => ['host', 'co-host'].includes(member.status))
    const validMembersIds = validMembers.map(ele => ele.userId) //=> [1, 2]
    validUsers = validUsers.concat(validMembersIds)
    //error handler
    if (!validUsers.includes(user.id)) {
        return res.status(403).json({
            "message": "Current User must be an attendee, host, or co-host of the event"
        })
    }
    //build
    const { url, preview } = req.body
    const newEventImage = await EventImage.build({
        eventId, url, preview
    })
    await newEventImage.save()
    const reNewEventImage = {
        id: newEventImage.id,
        url: newEventImage.url,
        preview: newEventImage.preview
    }

    return res.status(200).json(reNewEventImage)
})


//Edit an Event specified by its id
router.put('/events/:eventId', requireAuth, eventValidation.createEvent(), async (req, res) => {
    const { eventId } = req.params
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body
    const { user } = req
    const event = await Event.findByPk(eventId, {
        include: [
            {
                model: Group, attributes: ['organizerId'], include: [
                    { model: Membership }
                ]
            }
        ]
    })
    //error handler
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    const venue = await Venue.findByPk(venueId)
    if (!venue) {
        return res.status(404).json({
            "message": "Venue couldn't be found"
        })
    }

    //Current User must be the organizer of the group or a member of the group with a status of "co-host"
    let validUsers = []
    validUsers.push(event.Group.organizerId)
    //checking membership co-host
    const validMembers = event.Group.Memberships.filter(member => ['co-host'].includes(member.status))
    const validMembersIds = validMembers.map(ele => ele.userId)
    validUsers = validUsers.concat(validMembersIds)
    if (!validUsers.includes(user.id)) {
        return res.status(403).json({
            "message": "Current User must be the organizer of the group or a member of the group with a status of 'co-host'"
        })
    }
    //build
    const groupId = event.groupId
    event.groupId = groupId
    event.venueId = venueId
    event.name = name
    event.type = type
    event.capacity = capacity
    event.price = price
    event.description = description
    event.startDate = startDate
    event.endDate = endDate
    await event.save()

    const reEvent = event.get({ plain: true })
    reEvent.startDate = reEvent.startDate.toISOString().split('T')[0] + " " + reEvent.startDate.toISOString().split('T')[1].split('.')[0]
    reEvent.endDate = reEvent.endDate.toISOString().split('T')[0] + " " + reEvent.endDate.toISOString().split('T')[1].split('.')[0]
    delete reEvent.Group
    delete reEvent.createdAt
    delete reEvent.updatedAt
    return res.status(200).json(reEvent)
})


//Delete an Event specified by its id
router.delete('/events/:eventId', requireAuth, async (req, res) => {
    const { eventId } = req.params
    const { user } = req
    const event = await Event.findByPk(eventId, {
        include: [
            {
                model: Group, attributes: ['organizerId'], include: [
                    { model: Membership }
                ]
            }
        ]
    })
    //error handler
    if (!event) {
        res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    //Current User must be the organizer of the group or a member of the group with a status of "co-host"
    let validUsers = []
    validUsers.push(event.Group.organizerId)
    //checking membership co-host
    const validMembers = event.Group.Memberships.filter(member => ['co-host'].includes(member.status))
    const validMembersIds = validMembers.map(ele => ele.userId)
    validUsers = validUsers.concat(validMembersIds)
    if (!validUsers.includes(user.id)) {
        return res.status(403).json({
            "message": "Current User must be the organizer of the group or a member of the group with a status of 'co-host'"
        })
    }
    //Delete
    await event.destroy()

    return res.status(200).json({
        "message": "Successfully deleted"
    })
})







module.exports = router;