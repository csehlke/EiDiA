"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const UploadController = require('../controllers/upload');
const ModelController = require('../controllers/model');

router.get('/attributes/get/:selectedDocumentTypeId', middleWares.checkAuthentication, ModelController.listAttributes);

router.post('/document', middleWares.checkAuthentication, UploadController.uploadDocument);
router.post('/data', middleWares.checkAuthentication, UploadController.addAttributes);

module.exports = router;
