
const Application = require("../models/application.model");
const Gig = require("../models/gig.model");
const AppError = require("../utils/app-error");
const { JSendResponse } = require("../utils/jsend-response");



exports.createApplication = async (req, res, next) => {
  // Validate the request body
  // gig applicant note status 
  req.body.applicant = req.user_id;
  if (!req.body) {
    return next(new AppError("Request body is missing", 400));
  }

  try {

    // create application
    const application_ = await Application.create(req.body);
    const gig_ = await Gig.findById(req.body.gig);

    if (!gig_) {
      return next(new AppError("There is no gig with this id", 400));
    }

    await Gig.findByIdAndUpdate(req.body.gig, { $push: { applications: application_._id } });

    res.send(
      new JSendResponse().success(
        data = application_,
        message = "application posted successfully")
    );
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};



// update application
exports.updateApplication = async (req, res, next) => {
  try {
    const getApplication = await Application.findById(req.params.id);

    if (!getApplication) {
      return next(new new AppError("There is no application with this id", 400)());
    }

    const applicant_ = await Application.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.send(
      new JSendResponse().success(
        data = applicant_,
        message = "applicant updated successfully"
      )
    );
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};



// Delete application
exports.deleteApplication = async (req, res, next) => {
  try {
    const getApplication = await Application.findById(req.params.id);
    if (!getApplication)
      return next(new AppError("There is no application with the specified id", 400));

    await Application.findByIdAndDelete(req.params.id);
    await Gig.findByIdAndUpdate(req.body.gig, { $pull: { applications: application_._id } });

    res.send(
      new JSendResponse().success(
        data = undefined,
        message = "Application deleted successfully"
      )
    );
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};


// get one application detail
exports.getApplication = async (req, res, next) => {

  try {
    const getApplication_ = await Application.findById(req.params.id).populate('applicantModel').populate('gigModel');

    res.send(new JSendResponse().success((data = getApplication_)));
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};

// get all application for a user
exports.getApplications = async (req, res, next) => {

  try {
    const getApplications_ = await Application.find({ applicant: req.user_id }).populate('applicantModel').populate('gigModel');

    res.send(new JSendResponse().success((data = getApplications_)));
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};

exports.getMyApplications = async (req, res, next) => {
  try {
    const getApplications_ = await Application.find({ applicant: req.user_id }).populate('applicantModel').populate('gigModel');

    res.send(new JSendResponse().success((data = getApplications_)));
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};

exports.getGigApplications = async (req, res, next) => {
  try {
    const getApplications_ = await Application.find({ gig: req.params.gigId }).populate('applicantModel').populate('gigModel');

    res.send(new JSendResponse().success((data = getApplications_)));
  } catch (error) {
    next(new AppError(error.message || "Server Error", 500, error.stack));
  }
};