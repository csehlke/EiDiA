"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');


//TODO Add authentication middleware
router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);
// router.get('/list/attributes',RecordController.listDocumentsByTypeAndRecord)
// router.get('/document/list/types/:recordId', middleWares.checkAuthentication, ModelController.listDocumentTypes);
router.get('/document/list/:recordId', RecordController.listDocumentByRecordId);

module.exports = router;
