const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    path: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
});


// Export the model
module.exports = mongoose.model('File', fileSchema);