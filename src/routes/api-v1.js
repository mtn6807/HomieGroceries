const config = require('../../../config');
const users = require('../../../controllers/users.js');

const express = require('express');
const router = express.Router();

const controllers = require('@root/controllers');

// GET /api/v1/health
router.get('/health', controllers.v1.health);

/* GET /api/v1/ */
router.get('/', (request, res, next) => {
	// Return a list of endpoints
	res.send('Sorry, no endpoints yet!');
});

/*
* POST /api/v1/register/
* endpoint to register users.
*
*{username: <username>, password: <password>, email: <email>}}
*/
router.post('/register', async (request, res) => {
	try {
		const valid = await users.addUser(request.body.uname, request.body.pword, request.body.email);
		console.log(valid);
		if (valid == 0) {
			res.status(200).json({status: 'ok'});
		}

		if (valid == 1) {
			res.status(409).json({status: 'conflict: username in use'});
		}

		if (valid == 2) {
			res.status(409).json({status: 'conflict: email in use'});
		}
	} catch {
		res.status(503);
	}
});

module.exports = router;
