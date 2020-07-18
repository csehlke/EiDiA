"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');

//TODO:activate authentication for development

router.get('/list', RecordController.listRecords);
router.post('/add', RecordController.addRecord);
router.post('/folder/add', RecordController.addFolder)
router.get('/document/list/:recordId', RecordController.listDocumentByRecordId);
router.post('/document/update/name', RecordController.updateDocumentName);
router.post('/document/update/parentFolderId', RecordController.updateDocumentParentFolderId);
router.delete('/document/delete/:documentId', RecordController.deleteDocument);

router.get('/docTypes/list/:recordId', RecordController.getDocTypesForRecord);
router.get('/attributeTypes/list/:recordId', RecordController.getAttributeTypesForRecord);
router.get('/attributeValues/list/:recordId', RecordController.getAttributeValuesForRecord);

router.get('/document/listfolders/:recordId', RecordController.listFoldersByRecordId);


// router.get('/document/list/latest/:recordId', RecordController.listLatestDocumentsByRecordId);
/*router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);*/
module.exports = router;
