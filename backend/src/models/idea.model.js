const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    github: {
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
})


// Export the model
module.exports = mongoose.model('Idea', ideaSchema);