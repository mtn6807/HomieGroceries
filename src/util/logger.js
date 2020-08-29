'use strict';

const winston = require('winston');
const config = require('@root/config');

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	defaultMeta: {service: 'HomieGroceries'},
	transports: [
		new winston.transports.Console()
	]
});

module.exports = logger;
