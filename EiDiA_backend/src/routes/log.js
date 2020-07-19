"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const LogController = require('../controllers/log');


router.get('/list/:recordId', middleWares.checkAuthentication, LogController.getLogs);
router.get('/recentRecords/list/:userId', middleWares.checkAuthentication, LogController.getRecentRecords)

module.exports = router;
