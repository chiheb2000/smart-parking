module.exports = (app) => {
    const sensors = require('../controllers/sensor.controller.js');


    app.post('/sensors', sensors.create);


    app.get('/sensors', sensors.findAll);


    app.get('/sensors/:sensorId', sensors.findOne);


    app.put('/sensors/:sensorId', sensors.update);


    app.delete('/sensors/:sensorId', sensors.delete);
}