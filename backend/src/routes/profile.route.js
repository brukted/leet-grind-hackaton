const express = require('express');
const profileController = require('../controllers/profile.controller.js');
const { validateUser } = require('../validators/user.validator.js');
const router = express.Router();

router.route('/profile').put(validateUser, profileController.editProfile).get(profileController.getProfile);
router.route('/users/:userId').get(profileController.getUserById);

// export the router
module.exports = router;