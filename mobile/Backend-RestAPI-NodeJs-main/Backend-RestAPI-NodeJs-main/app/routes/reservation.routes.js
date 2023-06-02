module.exports = (app) => {
    const reservations = require('../controllers/reservation.controller.js');


    app.post('/reservations', reservations.create);


    app.get('/reservations', reservations.findAll);


    app.get('/reservations/:reservationId', reservations.findOne);


    app.put('/reservations/:reservationId', reservations.update);


    app.delete('/reservations/:reservationId', reservations.delete);
}