"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
// const ExportTemplateController = require('../controllers/exportTemplate');

router.get('/list', middleWares.checkAuthentication);//, AuthController.settings);
router.post('/save', middleWares.checkAuthentication);//, AuthController.settings);
router.get('/exportDocument', middleWares.checkAuthentication);//, AuthController.settings);
router.get('/download', middleWares.checkAuthentication);//, AuthController.settings);

module.exports = router;
