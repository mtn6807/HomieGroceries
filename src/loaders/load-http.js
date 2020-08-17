'use strict';

const http = require('http');
const config = require('@root/config');
const logger = require('@root/util/logger');

async function load(){
	const server = http.createServer(app);
	server.on('listening', ()=>{
		logger.log({
			level: http,
			message: "HTTP server is listening on port "+config.port
		});
	});
	return server;
}

module.exports = {
	load
};
