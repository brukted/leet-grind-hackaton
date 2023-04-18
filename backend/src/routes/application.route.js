const express = require("express");
const applicationController = require("../controllers/application.controller");
const { route } = require("./auth.route");
const router = express.Router();

router.route("/").post(applicationController.createApplication).get(applicationController.getApplications);

router
  .route("/:id")
  .delete(applicationController.deleteApplication)
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplication);


module.exports = router;