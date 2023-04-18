const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    tags: {
        type: [String],
        required: true
    },
    // Array of refs to ideas
    ideas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea'
    }],
    // Array of refs to applications
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
   
});

// Export the model
module.exports = mongoose.model('Gig', gigSchema);