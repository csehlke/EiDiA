"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
// const DashboardController = require('../controllers/dashboard');


router.get('/', middleWares.checkAuthentication);//, AuthController.settings);

router.get('/widget/list', middleWares.checkAuthentication);//, AuthController.settings);
router.post('/widget/add', middleWares.checkAuthentication);//, AuthController.settings);
router.put('/widget/drag', middleWares.checkAuthentication);//, AuthController.settings);

module.exports = router;
