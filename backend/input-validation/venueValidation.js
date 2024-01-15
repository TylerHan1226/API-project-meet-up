const { check } = require('express-validator')
const { handleValidationErrors } = require('../utils/validation')

function createVenue() {
    return [
        check('address')
            .exists({ checkFalsy: true })
            .withMessage('Street address is required'),
        check('city')
            .exists({ checkFalsy: true })
            .withMessage('City is required'),
        check('state')
            .exists({ checkFalsy: true })
            .withMessage('State is required'),
        check('lat')
            .exists({ checkFalsy: true })
            .isFloat({ min: -90, max: 90 })
            .withMessage('Latitude must be within -90 and 90'),
        check('lng')
            .exists({ checkFalsy: true })
            .isFloat({ min: -180, max: 180 })
            .withMessage('Longitude must be within -180 and 180'),
        handleValidationErrors
    ]
}



module.exports = {
    createVenue
}