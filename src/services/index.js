'use strict';

const authenticationServices = require('./authentication');
const houses = require('./houses');
const tokens = require('./tokens');

module.exports = {
	authentication: authenticationServices,
	houses,
	tokens
};
