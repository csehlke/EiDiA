"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const ExportTemplateController = require('../controllers/exportTemplate');

router.get('/list', middleWares.checkAuthentication, ExportTemplateController.listTemplates);
router.get('/template/:templateId', middleWares.checkAuthentication, ExportTemplateController.getTemplate);
router.post('/save', middleWares.checkAuthentication, ExportTemplateController.saveTemplate);
router.get('/exportDocuments', middleWares.checkAuthentication, ExportTemplateController.exportDocuments);
router.get('/documentNames', middleWares.checkAuthentication, ExportTemplateController.searchDocumentsByName);
router.get('/documents', middleWares.checkAuthentication, ExportTemplateController.getDocumentAttributes);


module.exports = router;
