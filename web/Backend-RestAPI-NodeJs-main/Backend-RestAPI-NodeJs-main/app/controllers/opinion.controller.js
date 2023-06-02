const Opinion = require('../models/opinion.model.js');

// Create and Save a new upinion
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "opinion content can not be empty"
        });
    }

    // Create a opinion
    const opinion = new Opinion({
        name: req.body.name || "Untitled Opinion",

        email: req.body.email,
        msg: req.body.msg
    });

    // Save upinion in the database
    opinion.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the opinion."
            });
        });
};

// Retrieve and return all opinion from the database.
exports.findAll = (req, res) => {
    Opinion.find()
        .then(opinions => {
            res.send(opinions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving opinions."
            });
        });
};

// Find a single upinion with a upinionId
exports.findOne = (req, res) => {
    Opinion.findById(req.params.opinionId)
        .then(opinion => {
            if (!opinion) {
                return res.status(404).send({
                    message: "opinion not found with id " + req.params.opinionId
                });
            }
            res.send(opinion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "opinion not found with id " + req.params.opinionId
                });
            }
            return res.status(500).send({
                message: "Error retrieving opinion with id " + req.params.opinionId
            });
        });
};

// Update a upinion identified by the upinionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "opinion content can not be empty"
        });
    }

    // Find upinion and update it with the request body
    Opinion.findByIdAndUpdate(req.params.opinionId, {
            name: req.body.name || "Untitled Opinion",

            email: req.body.email,
            message: req.body.message
        }, { new: true })
        .then(opinion => {
            if (!opinion) {
                return res.status(404).send({
                    message: "opinion not found with id " + req.params.opinionId
                });
            }
            res.send(opinion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "opinion not found with id " + req.params.opinionId
                });
            }
            return res.status(500).send({
                message: "Error updating opinion with id " + req.params.opinionId
            });
        });
};

// Delete a opinion with the specified upinionId in the request
exports.delete = (req, res) => {
    Opinion.findByIdAndRemove(req.params.opinionId)
        .then(opinion => {
            if (!opinion) {
                return res.status(404).send({
                    message: "opinion not found with id " + req.params.opinionId
                });
            }
            res.send({ message: "opinion deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "opinion not found with id " + req.params.opinionId
                });
            }
            return res.status(500).send({
                message: "Could not delete opinion with id " + req.params.opinionId
            });
        });
};