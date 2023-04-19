const express = require('express');
const gigController = require('../controllers/gig.controller.js');
const applicationController = require('../controllers/application.controller.js');
const { validateCreateGig } = require('../validators/gig.validator.js');
const router = express.Router();

router.route('/ideas/:ideaId/gigs/').post(validateCreateGig, gigController.create).get(gigController.findAll);
router.route('/ideas/:ideaId/gigs/:gigId').put(validateCreateGig, gigController.update).delete(gigController.deleteGig);
router.route('/gigs/:gigId/applications').get(applicationController.getGigApplications);
router.get('/me/gigs', gigController.getMyGigs);
router.get('/gigs').get(gigController.getAllGigs);
router.get('/gigs/:gigId').get(gigController.findOne);

// export the router
module.exports = router;