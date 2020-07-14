const config = require('/../../../config');
const users = require('../../../controller/user.js');

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
*{username: <username>, password: <password>}
*/
router.post('/register', (req, res) => {
	try{
		users.addUser(req.username,req.password);
	i	res.status(200).json({status:"ok"});
	}catch(err){
		res.status(503);
	}
});

module.exports = router;
