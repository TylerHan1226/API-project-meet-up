const { check } = require('express-validator')
const {handleValidationErrors} = require('../utils/validation')

function createGroup() { 
  return [
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 60 })
      .withMessage('Name must be 60 characters or less'),
    check('about')
      .exists({ checkFalsy: true })
      .isLength({ min: 50 })
      .withMessage('About must be 50 characters or more'),
    check('type')
      .isIn(['In person', 'Online'])
      .withMessage(`Type must be 'Online' or 'In person'`),
    check('private')
      .isIn(['true', 'false'])
      .withMessage('Private must be a boolean'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),    
    handleValidationErrors
  ]
}



module.exports = {
  createGroup
}