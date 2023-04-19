const { JSendResponse } = require("../utils/jsend-response");
const userModel = require("../models/user.model");
const AppError = require("../utils/app-error");

const editProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user_id);
    if (!user) {
        return res.status(404).send(new JSendResponse().fail(message = 'Account deleted'));
    }

    const allowedUpdates = ['name', 'lastname', 'email', 'phone', 'resume', 'telegram', 'github', 'linkedin'];
    Object.keys(req.body).forEach((key) => { if (!allowedUpdates.includes(key)) { delete req.body[key] } });
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send(new JSendResponse().fail(message = 'Invalid updates'));
    }

    try {
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(new JSendResponse().success(data = user, message = 'Profile updated successfully'));
    }
    catch (error) {
        return next(AppError('Server Error', 500));
    }
}

const getProfile = async (req, res) => {
    const user = await userModel.findById(req.user_id);
    if (!user) {
        return res.status(404).send(new JSendResponse().fail(message = 'Account deleted'));
    }
    res.send(new JSendResponse().success(data = user, message = 'Profile retrieved successfully'));
}

const getUserById = async (req, res, next) => {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.send(new JSendResponse().success(data = user, message = 'User retrieved successfully'));
};

module.exports = {
    editProfile,
    getProfile,
    getUserById
}
