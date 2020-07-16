"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const ExportTemplateController = require('../controllers/exportTemplate');

router.get('/list', middleWares.checkAuthentication, ExportTemplateController.listTemplates);
router.get('/template/:templateId', middleWares.checkAuthentication, ExportTemplateController.getTemplate);
router.post('/save', middleWares.checkAuthentication, ExportTemplateController.saveTemplate);
router.get('/export/:documents', middleWares.checkAuthentication, ExportTemplateController.exportDocument);
router.get('/search/:documentName', middleWares.checkAuthentication, ExportTemplateController.search);
router.get('/documents/:docNames', middleWares.checkAuthentication, ExportTemplateController.getDocuments);

module.exports = router;
