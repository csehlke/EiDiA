"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const UploadController = require('../controllers/upload');

router.post('/add', middleWares.checkAuthentication, UploadController.addDocument);
router.post('/adddoctype', middleWares.checkAuthentication, UploadController.addDocType);

module.exports = router;
