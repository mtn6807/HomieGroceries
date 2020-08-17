'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('@root/config');
const routes = require('@root/routes');

async function load() {
	// Create the app
	const app = express();

	// Add middlewares
	app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'www', 'public')));

	// Define some endpoints
	app.use('/', routes);

	// Default to a 404 error
	app.use((request, res, next) => {
		next(createError(404));
	});

	// Errors are cool, yo. Send em back.
	app.use((err, request, res, next) => {
		// I don't understand what this does.
		// This is express-generator boilerplate.
		res.locals.message = err.message;
		res.locals.error = request.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
		res.render('error');

	});
	app.set('port', config.port);

	return app;
}

module.exports = {
	load
};
