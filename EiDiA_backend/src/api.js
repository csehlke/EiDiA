"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middleWares = require('./middlewares');

const auth  = require('./routes/auth');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));
api.use(middleWares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'EiDiA Backend'
    });
});

// API routes
api.use('/auth'  , auth);

module.exports = api;
