const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: [true, 'The email is unique'],

    },
    password: {
        type: String,
        required: [true, '**Vérifiez vos informations!!']
    },
    tel: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);