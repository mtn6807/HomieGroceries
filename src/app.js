'use strict';

const moduleAlias = require('module-alias');
moduleAlias.addAlias('@root', __dirname);

const loaders = require('@root/loaders');
const config = require('@root/config');

async function createServer(){
	const components = await loaders.load();

	// Attach the http server to the express app
	components.http.on('request', components.express);

	// Begin listening
	components.http.listen(config.port);
}

createServer();
