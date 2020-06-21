"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
// const UploadController = require('../controllers/upload');

router.post('/document', middleWares.checkAuthentication);//, AuthController.settings);
router.post('/data', middleWares.checkAuthentication);//, AuthController.settings);

module.exports = router;
