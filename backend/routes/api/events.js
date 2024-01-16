const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue, Event, EventImage, Attendance } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth')
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
        if (!page || page < 1) err.page = "Page must be greater than or equal to 1"
        if (!size || size < 1) err.size = "Size must be greater than or equal to 1"
        if (name && (typeof name !== 'string' || !isNaN(Number(name)))) err.name = "Name must be a string"
        if (type && !['Online', 'In person'].includes(type)) err.type = "Type must be 'Online' or 'In Person'"
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
        queryObj.where.type = {
            [Op.substring]: type
        };
    }
    if (startDate) {
        queryObj.where.startDate = startDate
    }
    //paginationObj
    let paginationObj = {}
    if (size) {
        paginationObj.limit = size;
    }
    if (page) {
        paginationObj.offset = size * (page - 1);
    }
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
        delete eachREvent.Attendances
        delete eachREvent.EventImages
    }

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
    if (events.length === 0) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }

    const reEvents = []
    for (let eachEvent of events) {
        if (eachEvent.Group.id == groupId) {
            reEvents.push(eachEvent.toJSON())
        }
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
    const reNewEvent = {
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: newEvent.price,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate
    }

    return res.status(200).json(reNewEvent)
})


//Add an Image to an Event based on the Event's id
router.post('/events/:eventId/images', requireAuth, async (req, res) => {
    const { eventId } = req.params
    const { user } = req
    const event = await Event.findByPk(eventId, {
        include: [
            { model: Attendance },
            { model: Group, attributes: ['organizerId'], include: [
                { model: Membership }
            ] }
        ]
    })
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found"
        })
    }
    //Require proper authorization: Current User must be an attendee, host, or co-host of the event
    const validUsers = []
    validUsers.push(event.Group.organizerId)
    if (event.Attendances.length !== 0) {
        for (let eachAtt of event.Attendances) {
            if (eachAtt.status == 'attending') {
                validUsers.push(eachAtt.userId)
            }
        }
    }
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
        eventId: newEventImage.eventId,
        url: newEventImage.url,
        preview: newEventImage.preview
    }

    return res.status(200).json(reNewEventImage)
})


//Edit an Event specified by its id
router.put('/events/:eventId', requireAuth, async (req, res) => {
    const { eventId } = req.params


    return res.status(200).json(eventId)
})






module.exports = router;