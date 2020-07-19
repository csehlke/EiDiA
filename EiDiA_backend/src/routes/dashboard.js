"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const DashboardController = require('../controllers/dashboard');


/*router.get('/', middleWares.checkAuthentication, DashboardController.getDashboard);

router.get('/widget/list', middleWares.checkAuthentication, DashboardController.listWidgetTypes);
router.post('/widget/add', middleWares.checkAuthentication, DashboardController.addWidget);
router.put('/widget/drag', middleWares.checkAuthentication, DashboardController.moveWidget);*/
//TODO:activate authentication for development
router.get('/', DashboardController.getDashboard);

router.get('/widget/list/:recordId', DashboardController.listWidgetsToRecord);
router.post('/widget/add/', middleWares.checkAuthentication, DashboardController.addWidget);
router.put('/widget/drag', DashboardController.moveWidget);

module.exports = router;
