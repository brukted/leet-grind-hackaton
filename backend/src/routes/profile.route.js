const express = require('express');
const profileController = require('../controllers/profile.controller.js');
const { validateUser } = require('../validators/user.validator.js');
const router = express.Router();

router.route('/profile').put(validateUser, profileController.editProfile).get(profileController.getProfile);

// export the router
module.exports = router;