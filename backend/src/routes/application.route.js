const express = require("express");
const applicationController = require("../controllers/application.controller");
const router = express.Router();

router.route("/applications/").post(applicationController.createApplication).get(applicationController.getApplications);

router.get("/me/applications", applicationController.getMyApplications);

router
  .route("/applications/:id")
  .delete(applicationController.deleteApplication)
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplication);


module.exports = router;