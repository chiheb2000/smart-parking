const Parking = require('../models/parking.model.js');

// Create and Save a new parking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.namePar) {
        return res.status(400).send({
            message: "parking content can not be empty"
        });
    }

    // Create a parking
    const parking = new Parking({
        namePar: req.body.namePar || "Untitled parking",
        localisation: req.body.localisation,
        x: req.body.x,
        y: req.body.y,
        dimensions: req.body.dimensions,
        nbre: req.body.nbre,
        heure: req.body.heure,
        jour: req.body.jour,
        mois: req.body.mois


    });

    // Save parking in the database
    parking.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the parking."
            });
        });
};

// Retrieve and return all parking from the database.
exports.findAll = (req, res) => {
    Parking.find()
        .then(parkings => {
            res.send(parkings);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving parkings."
            });
        });
};

// Find a single parking with a parkingId
exports.findOne = (req, res) => {
    Parking.findById(req.params.parkingId)
        .then(parking => {
            if (!parking) {
                return res.status(404).send({
                    message: "parking not found with id " + req.params.parkingId
                });
            }
            res.send(parking);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "parking not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error retrieving parking with id " + req.params.parkingId
            });
        });
};

// Update a parking identified by the parkingId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.namePar) {
        return res.status(400).send({
            message: "parking content can not be empty"
        });
    }

    // Find parking and update it with the request body
    Parking.findByIdAndUpdate(req.params.parkingId, {
            namePar: req.body.namePar || "Untitled parking",
            localisation: req.body.localisation,
            x: req.body.x,
            y: req.body.y,
            dimensions: req.body.dimensions,
            nbre: req.body.nbre,
            heure: req.body.heure,
            jour: req.body.jour,
            mois: req.body.mois

        }, { new: true })
        .then(parking => {
            if (!parking) {
                return res.status(404).send({
                    message: "parking not found with id " + req.params.parkingId
                });
            }
            res.send(parking);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "parking not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Error updating parking with id " + req.params.parkingId
            });
        });
};

// Delete a parking with the specified parkingId in the request
exports.delete = (req, res) => {
    Parking.findByIdAndRemove(req.params.parkingId)
        .then(parking => {
            if (!parking) {
                return res.status(404).send({
                    message: "parking not found with id " + req.params.parkingId
                });
            }
            res.send({ message: "parking deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "parking not found with id " + req.params.parkingId
                });
            }
            return res.status(500).send({
                message: "Could not delete parking with id " + req.params.parkingId
            });
        });
};