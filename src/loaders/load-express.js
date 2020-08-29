'use strict';

const config = require('@root/config');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const path = require('path');
const routes = require('@root/routes');

async function load() {
	// Create the app
	const app = express();

	// Add middlewares
	app.use(morgan('dev')); // TODO - better logging
	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '..', 'www', 'public')));

	// Define some endpoints
	app.use('/', routes);

	// Default to a 404 error
	app.use((request, response, next) => {
		next(createError(404));
	});

	// Errors are cool, yo. Send em back.
	app.use((err, request, response, next) => {
		const status = err.status || 500;
		status = status < 500 ? status : 500;
		const message = err.message || 'Internal Server Error';
		message = status < 500 ? message : 'Internal Server Error';
		response.status(err.status).json({ok: false, err});
	});
	app.set('port', config.port);

	return app;
}

module.exports = {
	load
};
