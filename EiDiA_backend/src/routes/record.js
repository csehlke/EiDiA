"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');


router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);
router.get('/document/listfolders/:recordId', middleWares.checkAuthentication, RecordController.listFoldersByRecordId);
router.get('/recentlist', middleWares.checkAuthentication, RecordController.listRecentRecords);

module.exports = router;
