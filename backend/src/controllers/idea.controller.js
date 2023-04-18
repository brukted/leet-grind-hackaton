const Idea = require("../models/idea.model");
const AppError = require("../utils/app-error");

exports.createIdea = async (req, res, next) => {
  // Validate the request body
  if (!req.body) {
    next(new AppError("Request body is missing", 400));
  }

  try {
    // create idea
    const idea = await Idea.create(req.body, {
      runValidators: true,
      new: true,
    });

    return res.status(200).json({
      success: true,
      idea: idea,
    });
  } catch (error) {
    next(new AppError("Server Error", 500));
  }
};

exports.updateIdea = async (req, res, next) => {
  try {
    const getIdea = await Idea.findById(req.params.id);

    if (!getIdea) {
      return next(new new AppError("There is no idea with this id", 400)());
    }

    // get body author tags description github gigs

    // const { description, tags, github, gigs } = req.body;

    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.status(200).json({
      success: true,
      idea: idea,
    });

  } catch (error) {
    next(new AppError("Server Error", 500));
  }

};
