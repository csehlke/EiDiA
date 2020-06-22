"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const ModelController = require('../controllers/model');

router.get('/attribute/list', middleWares.checkAuthentication, ModelController.listAttributeTypes);

router.get('/document/list', middleWares.checkAuthentication, ModelController.listDocumentTypes);
router.post('/document/create', middleWares.checkAuthentication, ModelController.createDocumentType);

module.exports = router;
