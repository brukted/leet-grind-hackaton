const { JSendResponse } = require("../utils/jsend-response");
const userModel = require("../models/user.model");

const editProfile = async (req, res) => {

}

const getProfile = async (req, res) => {
    const user = await userModel.findById(req.user_id);
    if (!user) {
        return res.status(404).send(new JSendResponse().fail(message = 'Account deleted'));
    }
    res.send(new JSendResponse().success(data = user, message = 'Profile retrieved successfully'));
}


module.exports = {
    editProfile,
    getProfile
}