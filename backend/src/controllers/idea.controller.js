const Idea = require("../models/idea.model");
const AppError = require("../utils/app-error");
const { JSendResponse } = require("../utils/jsend-response");

exports.createIdea = async (req, res, next) => {
  // Validate the request body

  req.body.author = req.user_id;
  if (!req.body) {
    return next(new AppError("Request body is missing", 400));
  }

  const idea = await Idea.findOne({ github: req.body.github });
  if (idea) {
    return next(new AppError("Idea already exist", 400));
  }

  try {
    // create idea
    const idea = await Idea.create(req.body);

    res.send(
      new JSendResponse().success(
        (data = idea),
        (message = "idea created successful")
      )
    );
  } catch (error) {
    next(new AppError("Server Error", 500, error.stack));
  }
};

// update idea
exports.updateIdea = async (req, res, next) => {
  try {
    const getIdea = await Idea.findById(req.params.id);

    if (!getIdea) {
      return next(new new AppError("There is no idea with this id", 400)());
    }

    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.send(
      new JSendResponse().success(
        (data = idea),
        (message = "idea created successful")
      )
    );
  } catch (error) {
    next(new AppError("Server Error", 500));
  }
};

// Delete idea
exports.deleteIdea = async (req, res, next) => {
  try {
    const getIdea = await Idea.findById(req.params.id);
    if (!getIdea)
      return next(new AppError("There is no idea with the specified id", 400));

    await Idea.findByIdAndDelete(req.params.id);

    res.send(
      new JSendResponse().success(
        (data = undefined),
        (message = "idea deleted successfully")
      )
    );
  } catch (error) {
    next(error);
  }
};

// get ideas
exports.getIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Respond
    res.send(new JSendResponse().success((data = idea)));
  } catch (error) {
    next(error);
  }
};

// get ideas
exports.getAllIdeas = async (_, res, next) => {
  try {
    const getIdea = await Idea.find();

    res.send(new JSendResponse().success((data = getIdea)));
  } catch (error) {
    next(error);
  }
};

exports.getMyIdeas = async (req, res, next) => {
  try {
    const getIdea = await Idea.find({ author: req.user_id });

    res.send(new JSendResponse().success((data = getIdea)));
  } catch (error) {
    next(error);
  }
};
