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

router.get(
	'/houses',
	controllers.v1.authentication.checkAuthed,
	controllers.v1.houses.get
);
router.post(
	'/houses',
	controllers.v1.authentication.checkAuthed,
	controllers.v1.houses.create
);

// 404 catch
router.use((request, response)=>{
	response.status(404).json({ok:false});
});

module.exports = router;
