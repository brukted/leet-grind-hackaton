const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    title: {
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
    idea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea',
        required: true
    },
    // Array of refs to applications
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
}, { timestamps: true });

gigSchema.pre('remove', async function (next) {
    await this.model('Application').deleteMany({
        gig: this._id
    });
    next();
});

// Export the model
module.exports = mongoose.model('Gig', gigSchema);