const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');

//Models
const { User, Group, GroupImage, Membership, Venue } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth');
const venueValidation = require('../../input-validation/venueValidation');


//confirming route
router.use((req, res, next) => {
    console.log('Venue route hit!');
    next();
});


// Get All Venues for a Group specified by its id
router.get('/groups/:groupId/venues', requireAuth, async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    const group = await Group.findByPk(groupId, {
        include: [
            { model: Membership}
        ]
    })
    //Group couldn't be found
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    //Current User must be the organizer of the group or a member of the group with a status of "co-host"
    const memberUserIdArr = group.Memberships
        .filter(ele => ele.status === 'co-host' || ele.status === 'host')
        .map(ele => ele.userId);
    if (!memberUserIdArr.includes(user.id) && group.organizerId !== user.id) {
        return res.status(403).json({
            "message": 'Current User must be the organizer of the group or a member of the group with a status of co-host'
        })
    }

    const venues = await Venue.findAll({
        where: {groupId: groupId}
    })
    const reVenue = []
    venues.forEach(ele => {
        ele = ele.toJSON()
        ele.lat = parseFloat(ele.lat)
        ele.lng = parseFloat(ele.lng)
        reVenue.push(ele)
    })
    return res.status(200).json({Venues: reVenue})
})


// Create a new Venue for a Group specified by its id
router.post('/groups/:groupId/venues', requireAuth, venueValidation.createVenue(), async (req, res) => {
    const { groupId } = req.params
    const { user } = req
    const group = await Group.findByPk(groupId, {
        include: [
            { model: Membership}
        ]
    })
    //Group couldn't be found
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }
    //Current User must be the organizer of the group or a member of the group with a status of "co-host"
    const memberUserIdArr = group.Memberships
        .filter(ele => ele.status === 'co-host' || ele.status === 'host')
        .map(ele => ele.userId);
    if (!memberUserIdArr.includes(user.id) && group.organizerId !== user.id) {
        return res.status(403).json({
            "message": 'Current User must be the organizer of the group or a member of the group with a status of co-host'
        })
    }
    //Build Venue
    const { address, city, state, lat, lng } = req.body
    const newVenue = await Venue.build({
        groupId, address, city, state, lat, lng
    });
    await newVenue.save()
    const reNewGroupImg = {
        id: newVenue.id,
        groupId: newVenue.groupId,
        address: newVenue.address,
        city: newVenue.city,
        state: newVenue.state,
        lat: parseFloat(newVenue.lat),
        lng: parseFloat(newVenue.lng)
    }
    return res.status(200).json(reNewGroupImg)
})


//Edit a Venue specified by its id
router.put('/venues/:venueId', requireAuth, venueValidation.createVenue(), async (req, res) => {
    const { venueId } = req.params
    const { user } = req
    const venue = await Venue.findByPk(venueId, {
        include: [{ model: Group, include: [{ model: Membership }] }]
    })
    if (!venue) {
        return res.status(404).json({
            "message": "Venue couldn't be found"
          })
    }
    //Current User must be the organizer of the group or a member of the group with a status of "co-host"
    const memberUserIdArr = venue.Group.Memberships
    .filter(ele => ele.status === 'co-host' || ele.status === 'host')
    .map(ele => ele.userId);
    if (!memberUserIdArr.includes(user.id) && venue.Group.organizerId !== user.id) {
        return res.status(403).json({
            "message": 'Current User must be the organizer of the group or a member of the group with a status of co-host'
        })
    }

    //Edit
    const { address, city, state, lat, lng } = req.body
    venue.address = address
    venue.city = city
    venue.state = state
    venue.lat = lat
    venue.lng = lng
    await venue.save()
    let reVenue = venue.get({ plain: true })
    delete reVenue.Group
    delete reVenue.updatedAt
    return res.status(200).json(reVenue)
})



module.exports = router;