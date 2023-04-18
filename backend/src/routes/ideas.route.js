const express = require('express');
const ideaController = require('../controllers/idea.controller');
const { route } = require('./auth.route');
const router = express.Router();


router
  .route("/")
  .post(ideaController.createIdea)
  .get(ideaController.getIdeas)


router
  .route("/:id")
  .delete(ideaController.deleteIdea)
  .get(ideaController.getIdea)
  .patch(ideaController.updateIdea)


// export the router
module.exports = router;