"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');

//TODO:activate authentication for development

router.get('/list', RecordController.listRecords);
router.post('/add', RecordController.addRecord);

/*router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);*/
module.exports = router;
