"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const middleWares = require('./middlewares');

const auth = require('./routes/auth');
const record = require('./routes/record');
const dashboard = require('./routes/dashboard');
const model = require('./routes/model');
const upload = require('./routes/upload');
const exportTemplate = require('./routes/exportTemplate');
const search = require('./routes/search');
const log = require('./routes/log')
const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json({limit: '50mb'})); //Enable upload of large files
api.use(bodyParser.urlencoded({extended: false}));
api.use(middleWares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'EiDiA Backend'
    });
});

// API routes
api.use('/auth', auth);
api.use('/record', record);
api.use('/dashboard', dashboard);
api.use('/model', model);
api.use('/upload', upload);
api.use('/exporttemplate', exportTemplate);
api.use('/search', search);
api.use('/log', log)

module.exports = api;
