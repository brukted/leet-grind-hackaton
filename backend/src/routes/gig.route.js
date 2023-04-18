const express = require('express');
const gigController = require('../controllers/gig.controller.js');
const { validateCreateGig } = require('../validators/gig.validator.js');
const router = express.Router();

router.route('/ideas/:ideaId/gigs/').post(validateCreateGig, gigController.create).get(gigController.findAll);
router.route('/ideas/:ideaId/gigs/:gigId').put(validateCreateGig, gigController.update).delete(gigController.deleteGig);

// export the router
module.exports = router;