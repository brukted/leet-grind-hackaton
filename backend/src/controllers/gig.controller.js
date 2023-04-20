const JSendResponse = require("../utils/jsend-response").JSendResponse;
const Gig = require("../models/gig.model");
const Idea = require("../models/idea.model");
const AppError = require("../utils/app-error");
const Application = require("../models/application.model");

exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send(new JSendResponse().fail(message = "Content can not be empty!"));
    }

    // Create a gig
    const gig = new Gig({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        idea: req.params.ideaId
    });

    // Save gig in the database
    try {
        const data = await gig.save();
        res.send(new JSendResponse().success(await data.populate('ideaModel'), message = "Gig created successfully"));
    }
    catch (err) {
        return next(new AppError(err.message || "Some error occurred while creating the gig.", 500, err.stack))
    }
}


exports.update = async (req, res, next) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send(new JSendResponse().fail(message = "Content can not be empty!"));
    }

    // Find gig with id
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
        return res.status(404).send(new JSendResponse().fail(message = "Gig not found with id " + req.params.gigId));
    }

    // Update gig with id
    try {
        const gig = await Gig.findByIdAndUpdate(req.params.gigId, {
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            idea: req.params.ideaId
        }, { new: true }).populate('ideaModel');
        res.send(new JSendResponse().success(data = gig, message = "Gig updated successfully"));
    }
    catch (err) {
        return next(new AppError(err.message || "Error updating gig with id " + req.params.gigId, 500, err.stack));
    }
};

exports.deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findByIdAndRemove(req.params.gigId);
        if (!gig) {
            return res.status(404).send(new JSendResponse().fail(message = "Gig not found with id " + req.params.gigId));
        }
        res.send(new JSendResponse().success(data = gig, message = "Gig deleted successfully!"));
    }
    catch (err) {
        return next(new AppError(err.message || "Error deleting gig with id " + req.params.gigId, 500, err.stack));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const gigs = await Gig.find({ idea: req.params.ideaId }).populate('ideaModel');
        const myApps = (await Application.find({ applicant: req.user_id })).map(app => app.gig);

        const filteredGigs = gigs.map(gig => {
            if (myApps.includes(gig.id)) {
                return { ...gig.toObject(), hasUserApplied: true };
            }
            else {
                return { ...gig.toObject(), hasUserApplied: false };
            }
        }
        );

        res.send(new JSendResponse().success(data = filteredGigs, message = "Gigs retrieved successfully"));
    }
    catch (err) {
        return next(new AppError(err.message || "Some error occurred while retrieving gigs.", 500, err.stack));
    }
};

exports.getMyGigs = async (req, res, next) => {
    try {
        const ideas = await Idea.find({ author: req.user_id });
        const gigs = await Gig.find({ idea: { $in: ideas } }).populate('ideaModel');
        res.send(new JSendResponse().success(data = gigs, message = "Gigs retrieved successfully"));
    }
    catch (err) {
        return next(new AppError(err.message || "Some error occurred while retrieving gigs.", 500, err.stack));
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId).populate('ideaModel');
        if (!gig) {
            return res.status(404).send(new JSendResponse().fail(message = "Gig not found with id " + req.params.gigId));
        }
        res.send(new JSendResponse().success(data = gig, message = "Gig retrieved successfully"));
    }
    catch (err) {
        return next(new AppError(err.message || "Error retrieving gig with id " + req.params.gigId, 500, err.stack));
    }
}

exports.getAllGigs = async (req, res, next) => {
    try {
        const gigs = await Gig.find().populate('ideaModel');
        res.send(new JSendResponse().success(data = gigs, message = "Gigs retrieved successfully"));
    }
    catch (err) {
        return next(new AppError(err.message || "Some error occurred while retrieving gigs.", 500, err.stack));
    }
};