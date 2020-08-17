const config = require('../../../config');
const users = require('../../../controllers/users.js');
const login = require('../../../controllers/login.js');
const jwt = require('../../../controllers/tokens.js');

var express = require('express');
const { issueToken } = require('../../../controllers/tokens.js');
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
		if(valid==0){res.status(200).json({status:"ok"});}
		if(valid==1){res.status(409).json({status:"conflict: username in use"});}
		if(valid==2){res.status(409).json({status:"conflict: email in use"});}
	}catch(err){
		res.status(503);
	}
});

router.post('/login', async (req, res) => {
	try{
		const valid = await login.validateUser(req.body.uname,req.body.pword);
		if(valid == true){
			res.cookie("token", jwt.issueToken(req.body.uname),{ maxAge: jwtExpirySeconds * 1000 })
			res.status(200).json({status:"ok"})
		}
		if(valid == false){res.status(403).json({status:"unauthorized"});}
	}catch(err){
		res.status(503);
	}
});

router.get('/refresh', (req, res) => {
	try{
		if(jwt.verifyToken(req.cookies.token)){
			res.cookie("token", jwt.issueToken(req.body.uname),{ maxAge: jwtExpirySeconds * 1000 })
			res.status(200).json({status:"ok"})
		}else{res.status(403).json({status:"unauthorized"});}
	}catch(err){
		res.status(503);
	}
});

module.exports = router;
