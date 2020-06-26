"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const ExportTemplateController = require('../controllers/exportTemplate');

router.get('/list', middleWares.checkAuthentication, ExportTemplateController.listTemplates);
router.post('/save', middleWares.checkAuthentication, ExportTemplateController.saveTemplate);
router.get('/exportDocument', middleWares.checkAuthentication, ExportTemplateController.exportDocument);
router.get('/download', middleWares.checkAuthentication, ExportTemplateController.download);

module.exports = router;