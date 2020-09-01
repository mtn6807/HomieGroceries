'use strict';

const express = require('express');
const apiv1 = require('./api-v1');
const path = require('path');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/api/v1', apiv1);

// 404 catch - actually just sends index
router.use((request, response)=>{
	response.sendFile(path.join(__dirname, '..', 'www', 'public', 'index.html'));
});

module.exports = router;
