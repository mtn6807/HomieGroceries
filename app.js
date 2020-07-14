'use strict';

// For creating http errors apparently
var createError = require('http-errors');
// For easy API stuff on top of http
var express = require('express');
// For working with paths across OS's
var path = require('path');
// For... parsing cookies
var cookieParser = require('cookie-parser');
// This logs incoming HTTP requests
var logger = require('morgan');
// This renders 'views' when sending them back to the client.
let mustacheExpress = require('mustache-express');

// Require the route handlers for handling routes
let apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  //res.sendStatus(res.statusCode);
});

module.exports = app;
