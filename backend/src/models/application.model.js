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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

applicationSchema.virtual("applicantModel", {
    ref: "User",
    localField: "applicant",
    foreignField: "_id",
    justOne: true,
});

applicationSchema.virtual("gigModel", {
    ref: "Gig",
    localField: "gig",
    foreignField: "_id",
    justOne: true,
});

// Export the model
module.exports = mongoose.model('Application', applicationSchema);