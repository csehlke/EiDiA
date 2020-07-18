"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const LogController = require('../controllers/log');

//TODO:activate authentication for development

router.get('/list/:recordId', LogController.getLogs);
router.get('/recentRecords/list/:userId', LogController.getRecentRecords)
/*router.get('/list', middleWares.checkAuthentication, RecordController.listRecords);
router.post('/add', middleWares.checkAuthentication, RecordController.addRecord);*/
module.exports = router;
