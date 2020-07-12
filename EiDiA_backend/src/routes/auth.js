"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.get('/me', middleWares.checkAuthentication, AuthController.me);
router.get('/settings', middleWares.checkAuthentication, AuthController.getSettings);
router.put('/settings', middleWares.checkAuthentication, AuthController.saveSettings);
router.get('/logout', middleWares.checkAuthentication, AuthController.logout);
router.get('/list', middleWares.checkAuthentication, AuthController.listUsers);

router.get('/admin/list', middleWares.checkAuthentication, middleWares.checkAdmin, AuthController.listUsersForAdministration);
router.post('/admin/register', middleWares.checkAuthentication, middleWares.checkAdmin, AuthController.register);
router.put('/admin/update/:id', middleWares.checkAuthentication, middleWares.checkAdmin, AuthController.updateUser);
router.delete('/admin/delete/:id', middleWares.checkAuthentication, middleWares.checkAdmin, AuthController.deleteUser);

module.exports = router;
