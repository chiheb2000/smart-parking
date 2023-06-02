const Sensor = require('../models/sensor.model.js');

// Create and Save a new uensor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nbdispo) {
        return res.status(400).send({
            message: ""
        });
    }

    // Create a sensor
    const sensor = new Sensor({
        nbdispo: req.body.nbdispo || "Untitled Sensor"

    });

    // Save uensor in the database
    sensor.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the sensor."
            });
        });
};

// Retrieve and return all uensor from the database.
exports.findAll = (req, res) => {
    Sensor.find()
        .then(sensors => {
            res.send(sensors);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sensors."
            });
        });
};

// Find a single sensor with a sensorId
exports.findOne = (req, res) => {
    Sensor.findById(req.params.sensorId)
        .then(sensor => {
            if (!sensor) {
                return res.status(404).send({
                    message: "uensor not found with id " + req.params.sensorId
                });
            }
            res.send(sensor);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "sensor not found with id " + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: "Error retrieving sensor with id " + req.params.sensorId
            });
        });
};

// Update a uensor identified by the uensorId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nbdispo) {
        return res.status(400).send({
            message: "..."
        });
    }

    // Find uensor and update it with the request body
    Sensor.findByIdAndUpdate(req.params.sensorId, {
            nbdispo: req.body.nbdispo || "Untitled sensor"
        }, { new: true })
        .then(uensor => {
            if (!uensor) {
                return res.status(404).send({
                    message: "uensor not found with id " + req.params.sensorId
                });
            }
            res.send(uensor);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "sensor not found with id " + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: "Error updating sensor with id " + req.params.sensorId
            });
        });
};

// Delete a sensor with the specified sensorId in the request
exports.delete = (req, res) => {
    Sensor.findByIdAndRemove(req.params.sensorId)
        .then(sensor => {
            if (!sensor) {
                return res.status(404).send({
                    message: "sensor not found with id " + req.params.sensorId
                });
            }
            res.send({ message: "uensor deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "sensor not found with id " + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: "Could not delete sensor with id " + req.params.sensorId
            });
        });
};