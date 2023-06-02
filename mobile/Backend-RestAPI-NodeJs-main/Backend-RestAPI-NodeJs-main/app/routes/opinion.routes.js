module.exports = (app) => {
    const opinions = require('../controllers/opinion.controller.js');


    app.post('/opinions', opinions.create);


    app.get('/opinions', opinions.findAll);


    app.get('/opinions/:opinionId', opinions.findOne);


    app.put('/opinions/:opinionId', opinions.update);


    app.delete('/opinions/:opinionId', opinions.delete);
}