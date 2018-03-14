const express = require('express');
const bodyPareser = require('body-parser');
const logger = require('morgan');

const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended: false}));

require('./server/routes')(app)
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to cool stuff',
}));

module.exports = app;
