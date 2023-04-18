const userModel = require('../models/user.model');
const AppError = require('../utils/app-error');
const { JSendResponse } = require('../utils/jsend-response');

const signup = async (req, res, next) => {
    // Validate the request body
    if (!req.body) {
        throw new AppError('Request body is missing', 400);
    }

    // Check if the user already exists
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
        return next(new AppError('User already exists', 400));
    }

    // Create a new user
    const user = new userModel({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        linkedin: req.body.linkedin,
        github: req.body.github,
        telegram: req.body.telegram
    });

    // Save the user in the database
    try {
        const data = await user.save();
        res.send(new JSendResponse().success(data, message = 'User created successfully'));
    }
    catch (err) {
        res.status(500).send(new JSendResponse().fail(err.message));
    }
}

const login = async (req, res, next) => {
    // Validate the request body
    if (!req.body) {
        throw new AppError('Request body is missing', 400);
    }

    // Find the user
    const user = await userModel.findOne({ email: req.body.email });
    if (!user || !await user.comparePassword(req.body.password)) {
        return next(new AppError('Email or password is incorrect', 400));
    }

    // Generate an access token
    const token = user.generateAuthToken();
    res.send(new JSendResponse().success(data = { user: user, token: token }, message = 'Login successful'));
}

module.exports = {
    signup,
    login
}
