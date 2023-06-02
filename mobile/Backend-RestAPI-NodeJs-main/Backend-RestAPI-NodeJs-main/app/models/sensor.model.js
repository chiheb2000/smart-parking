const mongoose = require('mongoose');

const SensorSchema = mongoose.Schema({

    nbdispo: String,



}, {
    timestamps: true
});


module.exports = mongoose.model('Sensor', SensorSchema);