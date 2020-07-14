var express = require('express');
var router = express.Router();

/* GET /api/v1/ */
router.get('/', function(req, res, next) {
	// return a list of endpoints
	res.send('Sorry, no endpoints yet!');
});

module.exports = router;
