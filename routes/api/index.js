var express = require('express');
var router = express.Router();

let apiv1 = require('./v1');
router.use('/v1', apiv1);

module.exports = router;
