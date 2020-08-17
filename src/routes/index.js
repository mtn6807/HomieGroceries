'use strict';

const express = require('express');
const apiv1 = require('@root/routes/api-v1');

// eslint-disable-next-line nocaps
const router = express.Router();

router.use('/api/v1', apiv1);

module.exports = router;
