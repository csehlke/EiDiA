"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');

//TODO:activate authentication for development

router.get('/list', RecordController.listRecords);
router.post('/add', RecordController.addRecord);
// router.get('/list/attributes',RecordController.listDocumentsByTypeAndRecord)
// router.get('/document/list/types/:recordId', middleWares.checkAuthentication, ModelController.listDocumentTypes);
router.get('/document/list/:recordId', RecordController.listDocumentByRecordId);
router.get('/docTypes/list/:recordId', RecordController.getDocTypesForRecord);
router.get('/attributeTypes/list/:recordId', RecordController.getAttributeTypesForRecord);
router.get('/attributeValues/list/:recordId', RecordController.getAttributeValuesForRecord);


router.get('/document/list/latest/:recordId', RecordController.listLatestDocumentsByRecordId);
/*router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);*/
module.exports = router;
