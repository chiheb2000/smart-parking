const mongoose = require('mongoose');

const OpinionSchema = mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        unique: [true, 'The email is unique']

    },
    msg: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Opinion', OpinionSchema);