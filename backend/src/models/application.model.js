const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    gig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gig',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    note: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        required: true,
        minlength: 0,
        maxlength: 10
    }
});

// Export the model
module.exports = mongoose.model('Application', applicationSchema);