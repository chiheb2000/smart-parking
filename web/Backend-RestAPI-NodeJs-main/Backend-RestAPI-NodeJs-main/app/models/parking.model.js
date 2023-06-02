const mongoose = require('mongoose');

const ParkingSchema = mongoose.Schema({

    namePar: { type: String },
    localisation: { type: String },
    x: { type: Number },
    y: { type: Number },
    dimensions: { type: String },
    nbre: { type: Number },
    heure: { type: Number },
    jour: { type: Number },
    mois: { type: Number },


}, {
    timestamps: true
});


module.exports = mongoose.model('Parking', ParkingSchema);