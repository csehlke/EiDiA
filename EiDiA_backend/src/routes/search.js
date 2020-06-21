"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
// const SearchController = require('../controllers/search');


router.get('/basic', middleWares.checkAuthentication);//, AuthController.settings);
router.get('/advanced', middleWares.checkAuthentication);//, AuthController.settings);

module.exports = router;
