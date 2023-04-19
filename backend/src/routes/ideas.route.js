const express = require("express");
const ideaController = require("../controllers/idea.controller");
const router = express.Router();

router.route("/ideas").post(ideaController.createIdea).get(ideaController.getAllIdeas);

router.get("/me/ideas", ideaController.getMyIdeas);

router
  .route("/ideas/:id")
  .delete(ideaController.deleteIdea)
  .get(ideaController.getIdea)
  .patch(ideaController.updateIdea);

// export the router
module.exports = router;
