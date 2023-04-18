const express = require('express');
const profileController = require('../controllers/profile.controller.js');
const { validateUser } = require('../validators/user.validator.js');
const router = express.Router();

// Update profile endpoint
router.put('/api/v1/profile', validateUser, profileController.editProfile);

// Get profile endpoint
router.get('/api/v1/profile', profileController.getProfile);

// export the router
module.exports = router;