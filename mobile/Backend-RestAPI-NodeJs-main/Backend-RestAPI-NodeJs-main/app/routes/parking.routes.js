module.exports = (app) => {
    const parkings = require('../controllers/parking.controller.js');


    app.post('/parkings', parkings.create);


    app.get('/parkings', parkings.findAll);


    app.get('/parkings/:parkingId', parkings.findOne);


    app.put('/parkings/:parkingId', parkings.update);


    app.delete('/parkings/:parkingId', parkings.delete);
}