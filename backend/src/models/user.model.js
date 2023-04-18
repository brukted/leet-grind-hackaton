const mongoose = require('mongoose');

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
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    linkedin: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    github: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    telegram: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
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
});


// Export the model
module.exports = mongoose.model('User', userSchema);