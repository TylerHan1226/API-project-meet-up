// backend/routes/api/users.js
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.use((req, res, next) => {
  console.log('User route hit!');
  next();
});

// middleware to validate sign up - checking email, username, password
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isAlpha()
      .withMessage('First Name is required, and it cannot be a number or date.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isAlpha()
      .withMessage('Last Name is required, and it cannot be a number or date.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  } catch (err) {
    const errorObj = {}
    if (err.errors[0].message.includes("user")) {
      errorObj.username = "User with that username already exists"
    }
    if (err.errors[0].message.includes("email")) {
      errorObj.email = "User with that email already exists"
    }
    const reErr = {
      message: 'User already exists',
      errors: errorObj
    }
    return res.status(500).json(reErr)
  }
});


module.exports = router;