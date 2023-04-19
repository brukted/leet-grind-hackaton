const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    resume: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    linkedin: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    github: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    telegram: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    // Array of refs to gigs
    gigs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gig'
    }],
    // Array of refs to applications
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.jwtPrivateKey);
    return token;
};


// Export the model
module.exports = mongoose.model('User', userSchema);