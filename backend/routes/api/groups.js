const express = require('express');
const router = express.Router();
const { Op, or } = require('sequelize');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');

//Models
const { User, Group, GroupImage, Membership, Venue } = require('../../db/models');

//Validation middleware
const { requireAuth } = require('../../utils/auth');
const groupInputsValidation = require('../../input-validation/groupInputsValidation');
// const { handleValidationErrors } = require('../../utils/validation');



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
    const groupAsOrganizer = await Group.findOne({
        where: {organizerId: user.id}
    })

    const reGroups = []
    groups.push(groupAsOrganizer)
    for (let eachGroup of groups) {
        reGroups.push(eachGroup.toJSON())
    }
    for (let eachRGroup of reGroups) {
        if (eachRGroup.Memberships) {
            eachRGroup.numMembers = eachRGroup.Memberships.length
            delete eachRGroup.Memberships
        } else {
            eachRGroup.numMembers = 1
        }
        if (eachRGroup.GroupImages) {
            eachRGroup.previewImage = eachRGroup.GroupImages[0].url
            delete eachRGroup.GroupImages
        } else {
            eachRGroup.previewImage = null
        }
    }
    
    // return res.status(200).json(groups)
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
    //Error Handler
    if (!group) {
        return res.status(404).json({
            "message": "Group couldn't be found"
        })
    }

    const resultGroups = group.toJSON()
    resultGroups.numMembers = resultGroups.Memberships.length
    delete resultGroups.Memberships
    // resultGroups.Organizer = resultGroups.User
    // delete resultGroups.User

    return res.status(200).json(resultGroups)
})


// Create a Group
router.post('/', requireAuth, groupInputsValidation.createGroup(), async (req, res) => {

    const { user } = req
    const { name, about, type, private, city, state } = req.body
    const organizerId = user.id
    //Build instance
    const newGroup = await Group.build({
        organizerId, name, about, type, private, city, state
    })
    await newGroup.save()

    return res.status(201).json(newGroup);
})








module.exports = router;