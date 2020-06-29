"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const UploadController = require('../controllers/upload');

router.post('/document', middleWares.checkAuthentication, UploadController.uploadDocument);
router.post('/data', middleWares.checkAuthentication, UploadController.addAttributes);

module.exports = router;
