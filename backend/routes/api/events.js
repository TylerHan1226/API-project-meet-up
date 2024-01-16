const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue, Event, EventImage, Attendance } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth')



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
            { model: Attendance, where: { status: 'attending'} },
            { model: EventImage},
            { model: Group, attributes: ['id', 'name', 'city', 'state'] },
            { model: Venue, attributes: ['id', 'city', 'state']}
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
        eachREvent.numAttending = 1
        if (eachREvent.Attendances.length !== 0) {
            eachREvent.numAttending = eachREvent.Attendances.length
        }
        
        for (let eachEImg of eachREvent.EventImages) {
            if (eachEImg.preview === true) {
                eachREvent.previewImage = eachEImg.url
            }
        }
        delete eachREvent.Attendances
        delete eachREvent.EventImages
    }

    return res.status(200).json({ Events: reEvents })
})


//Get all Events of a Group specified by its id



module.exports = router;