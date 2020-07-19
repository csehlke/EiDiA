"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const DashboardController = require('../controllers/dashboard');

router.get('/', middleWares.checkAuthentication, DashboardController.getDashboard);

router.get('/widget/list/:recordId', middleWares.checkAuthentication, DashboardController.listWidgetsToRecord);
router.post('/widget/add/', middleWares.checkAuthentication, middleWares.checkAuthentication, DashboardController.addWidget);

module.exports = router;
