'use strict';

const path = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@root', __dirname);
moduleAlias.addAlias('@config', path.join(__dirname, 'config.js'));

const loaders = require('@root/loaders');
const config = require('@root/config');

async function createServer() {
	const components = await loaders.load();

	// Attach the http server to the express app
	components.http.on('request', components.express);

	// Begin listening
	components.http.listen(config.port);
}

createServer();
