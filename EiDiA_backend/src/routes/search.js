"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const SearchController = require('../controllers/search');


router.get('/basic', middleWares.checkAuthentication, SearchController.basicSearch);
router.get('/advanced', middleWares.checkAuthentication, SearchController.advancedSearch);

module.exports = router;
