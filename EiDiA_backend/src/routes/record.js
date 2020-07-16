"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');


//TODO Add authentication middleware
router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);
router.get('/document/listfolders/:recordId', RecordController.listFoldersByRecordId);

module.exports = router;
