"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const RecordController = require('../controllers/record');


router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.get('/name/:recordId', middleWares.checkAuthentication, RecordController.getRecordName)
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);
router.post('/folder/add', middleWares.checkAuthentication, RecordController.addFolder)
router.get('/document/list/:recordId', middleWares.checkAuthentication, RecordController.listDocumentByRecordId);
router.post('/document/update/name', middleWares.checkAuthentication, RecordController.updateDocumentName);
router.post('/document/update/parentFolderId', middleWares.checkAuthentication, RecordController.updateDocumentParentFolderId);
router.delete('/document/delete/:documentId', middleWares.checkAuthentication, RecordController.deleteDocument);

router.get('/docTypes/list/:recordId', middleWares.checkAuthentication, RecordController.getDocTypesForRecord);
router.get('/attributeTypes/list/:recordId', middleWares.checkAuthentication, RecordController.getAttributeTypesForRecord);
router.get('/attributeValues/list/:recordId', middleWares.checkAuthentication, RecordController.getAttributeValuesForRecord);

router.get('/document/listfolders/:recordId', middleWares.checkAuthentication, RecordController.listFoldersByRecordId);


module.exports = router;
