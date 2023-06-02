const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    iduser: { type: String },
    idparking: { type: String },
    nomPar: { type: String },
    dateE: { type: String },
    heureE: { type: String },
    dateS: { type: String },
    heureS: { type: String },
    status: { type: String },

}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', ReservationSchema);