const config = require('../../../config');
const users = require('../../../controllers/users.js');

var express = require('express');
var router = express.Router();

/* GET /api/v1/ */
router.get('/', function(req, res, next) {
	// return a list of endpoints
	res.send('Sorry, no endpoints yet!');
});

/*
* POST /api/v1/register/
* endpoint to register users.
*
*{username: <username>, password: <password>, email: <email>}}
*/
router.post('/register', async (req, res) => {
	try{
		const valid = await users.addUser(req.body.uname,req.body.pword,req.body.email);
		console.log(valid)
		if(valid==0){res.status(200).json({status:"ok"});}
		if(valid==1){res.status(409).json({status:"conflict: username in use"});}
		if(valid==2){res.status(409).json({status:"conflict: email in use"});}
	}catch(err){
		res.status(503);
	}
});

module.exports = router;
