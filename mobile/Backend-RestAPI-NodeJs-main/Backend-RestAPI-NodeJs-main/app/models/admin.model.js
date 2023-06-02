const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'The login is unique']

    },
    email: {
        type: String,
        unique: [true, 'The email is unique']

    },
    status: {
        type: String
    },
    password: { type: String, required: true },


    birthday: { type: String },
    Cin: { type: String },

    sexe: { type: String },
    Tel: { type: String },
    img: { type: String },

}, {
    timestamps: true
});


module.exports = mongoose.model('Admin', AdminSchema);