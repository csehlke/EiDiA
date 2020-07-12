"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const ExplorerController = require('../controllers/explorer');

router.get('/hierarchy', middleWares.checkAuthentication, ExplorerController.getHierachy);
router.post('/addFolder', middleWares.checkAuthentication, ExplorerController.addFolder);
router.put('/drag', middleWares.checkAuthentication, ExplorerController.moveElement);
router.delete('/remove', middleWares.checkAuthentication, ExplorerController.removeElement);
router.get('/download', middleWares.checkAuthentication, ExplorerController.downloadElement);

module.exports = router;
