const express = require('express');
const authController = require('../controllers/auth.controller.js');
const { validateUser, validateRegister, validateLogin } = require('../validators/user.validator.js');
const router = express.Router();

// Signup endpoint
router.post('/api/v1/signup', validateRegister, authController.signup);

// Login endpoint
router.post('/api/v1/login', validateLogin, authController.login);

// Edit profile endpoint
router.put('/api/v1/profile', validateUser, authController.editProfile);

// Get profile endpoint
router.get('/api/v1/profile', authController.getProfile);


// export the router
module.exports = router;