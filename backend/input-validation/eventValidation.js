const { check } = require('express-validator')
const { handleValidationErrors } = require('../utils/validation')

function createEvent() {
    return [
        check('name')
            .exists({ checkFalsy: true })
            .isLength({ min: 5 })
            .withMessage("Name must be at least 5 characters"),
        check('type')
            .isIn(['In person', 'Online'])
            .withMessage("Type must be Online or In person"),        
        check('capacity')
            .exists({ checkFalsy: true })
            .isInt({ checkFalsy: true })
            .withMessage("Capacity must be an integer"),
        check('price')
            .exists({ checkFalsy: true })
            .isFloat({ checkFalsy: true })
            .withMessage("Price is invalid"),
        check('description')
            .exists({ checkFalsy: true })
            .withMessage("Description is required"),
        check('startDate')
            .exists({ checkFalsy: true })
            .isISO8601()
            .withMessage("Start date must be in the future")
            .custom(value => {
                const startDate = new Date(value)
                const currentDate = new Date()
                if (startDate <= currentDate) {
                    throw new Error("Start date must be in the future")
                }
                return true
            }),
        check('endDate')
            .exists({ checkFalsy: true })
            .isISO8601()
            .withMessage("End date is less than start date")
            .custom((value, { req }) => {
                const endDate = new Date(value)
                const startDate = new Date(req.body.startDate)
                if (endDate <= startDate) {
                    throw new Error("End date must be after the start date")
                }
                return true
            }),
        handleValidationErrors
    ]
}



module.exports = {
    createEvent
}