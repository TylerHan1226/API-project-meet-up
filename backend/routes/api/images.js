const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue, Event, EventImage, Attendance } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth')

//confirming route
router.use((req, res, next) => {
    console.log('Image route hit!');
    next();
});



// Delete an Image for a Group
router.delete('/group-images/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    const { user } = req
    const gImage = await GroupImage.findByPk(imageId, {
        include: [
            {
                model: Group, attributes: ['organizerId'], include: [
                    { model: Membership, attributes: ['userId', 'status'] }
                ]
            }
        ]
    })
    if (!gImage) {
        return res.status(404).json({
            "message": "Group Image couldn't be found"
        })
    }
    //Current user must be the organizer or co-host of the Group
    const hosts = []
    hosts.push(gImage.Group.organizerId)
    gImage.Group.Memberships.forEach(ele => {
        if (['co-host'].includes(ele.status)) {
            hosts.push(ele.userId)
        }
    })
    if (!hosts.includes(user.id)) {
        return res.status(403).json({
            "message": "Current user must be the organizer or co-host of the Group"
        })
    }
    //delete
    await gImage.destroy()

    return res.status(200).json({
        "message": "Successfully deleted"
    })
})



//Delete an Image for an Event
router.delete('/event-images/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    const { user } = req
    const eImage = await EventImage.findByPk(imageId, {
        include:[
            { model: Event, attributes: ['id'], include: [
                { model: Group, attributes: ['organizerId'] , include: [
                    { model: Membership, attributes: ['userId', 'status'] }
                ] }
            ] }
        ]
    })
    //error handler
    if (!eImage) {
        return res.status(404).json({
            "message": "Event Image couldn't be found"
        })
    }
    //Current user must be the organizer or "co-host" of the Group that the Event belongs to
    const hosts = []
    hosts.push(eImage.Event.Group.organizerId)
    eImage.Event.Group.Memberships.forEach(ele => {
        if (['co-host'].includes(ele.status)) {
            hosts.push(ele.userId)
        }
    })
    if (!hosts.includes(user.id)) {
        return res.status(403).json({
            "message": "Current user must be the organizer or co-host of the Group"
        })
    }
    //delete
    await eImage.destroy()
    
    return res.status(200).json({
        "message": "Successfully deleted"
    })
})




module.exports = router;