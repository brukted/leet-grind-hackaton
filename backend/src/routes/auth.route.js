const express = require('express');
const authController = require('../controllers/auth.controller.js');
const { validateRegister, validateLogin } = require('../validators/user.validator.js');
const router = express.Router();

// Signup endpoint
router.post('/api/v1/signup', validateRegister, authController.signup);

// Login endpoint
router.post('/api/v1/login', validateLogin, authController.login);

// export the router
module.exports = router;