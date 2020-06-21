"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
// const ExplorerController = require('../controllers/explorer');

router.get('/hierarchy', middleWares.checkAuthentication);//, AuthController.settings);
router.post('/addFolder', middleWares.checkAuthentication);//, AuthController.settings);
router.put('/drag', middleWares.checkAuthentication);//, AuthController.settings);
router.delete('/remove', middleWares.checkAuthentication);//, AuthController.settings);
router.get('/download', middleWares.checkAuthentication);//, AuthController.settings);

module.exports = router;
