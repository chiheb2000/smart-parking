const Reservation = require('../models/reservation.model.js');

// Create and Save a new reservation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.iduser) {
        return res.status(400).send({
            message: "ueservation content can not be empty"
        });
    }

    // Create a ueservation
    const reservation = new Reservation({
        iduser: req.body.iduser || "Untitled Reservation",
        idparking: req.body.idparking,
        nomPar: req.body.nomPar,
        dateE: req.body.dateE,
        heureE: req.body.heureE,
        dateS: req.body.dateS,
        heureS: req.body.heureS,
        status: req.body.status
    });

    // Save reservation in the database
    reservation.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the reservation."
            });
        });
};

// Retrieve and return all reservation from the database.
exports.findAll = (req, res) => {
    Reservation.find()
        .then(reservations => {
            res.send(reservations);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving reservations."
            });
        });
};

// Find a single reservation with a reservationId
exports.findOne = (req, res) => {
    Reservation.findById(req.params.reservationId)
        .then(reservation => {
            if (!reservation) {
                return res.status(404).send({
                    message: "reservation not found with id " + req.params.reservationId
                });
            }
            res.send(reservation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "reservation not found with id " + req.params.reservationId
                });
            }
            return res.status(500).send({
                message: "Error retrieving reservation with id " + req.params.reservationId
            });
        });
};

// Update a ueservation identified by the ueservationId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.iduser) {
        return res.status(400).send({
            message: "reservation content can not be empty"
        });
    }

    // Find reservation and update it with the request body
    Reservation.findByIdAndUpdate(req.params.reservationId, {
            iduser: req.body.iduser || "Untitled Reservation",
            idparking: req.body.idparking,
            nomPar: req.body.nomPar,
            dateE: req.body.dateE,
            heureE: req.body.heureE,
            dateS: req.body.dateS,
            heureS: req.body.heureS,
            status: req.body.status
        }, { new: true })
        .then(reservation => {
            if (!reservation) {
                return res.status(404).send({
                    message: "reservation not found with id " + req.params.reservationId
                });
            }
            res.send(reservation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "reservation not found with id " + req.params.reservationId
                });
            }
            return res.status(500).send({
                message: "Error updating reservation with id " + req.params.reservationId
            });
        });
};

// Delete a ueservation with the specified reservationId in the request
exports.delete = (req, res) => {
    Reservation.findByIdAndRemove(req.params.reservationId)
        .then(reservation => {
            if (!reservation) {
                return res.status(404).send({
                    message: "reservation not found with id " + req.params.reservationId
                });
            }
            res.send({ message: "reservation deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "reservation not found with id " + req.params.reservationId
                });
            }
            return res.status(500).send({
                message: "Could not delete ueservation with id " + req.params.reservationId
            });
        });
};