"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
// const RecordController = require('../controllers/record');


router.get('/list', middleWares.checkAuthentication);//, AuthController.settings);
router.post('/add', middleWares.checkAuthentication);//, AuthController.settings);

module.exports = router;
