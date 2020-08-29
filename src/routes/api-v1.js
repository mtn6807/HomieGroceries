'use strict';

const express = require('express');
const controllers = require('@root/controllers');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/health', controllers.v1.health);
router.post('/register', controllers.v1.authentication.register);
router.post('/login', controllers.v1.authentication.login);
router.get('/logout', controllers.v1.authentication.logout);
router.get('/refresh', controllers.v1.authentication.refresh);

module.exports = router;
