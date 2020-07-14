'use strict';

// Let the chaos begin. Step 1 - importing node modules for later use.

const createError = require('http-errors');     // creates errors
const express = require('express');             // also creates errors lmao
const path = require('path');                   // cross-OS paths
const cookieParser = require('cookie-parser');  // parses cookies
const logger = require('morgan');               // ...logs http things
const debug = require('debug')('HG:server');    // logs other things?
const http = require('http');                   // more errors haha
const mustacheExpress = require('mustache-express'); // renders shit

// Step 2 - import some custom shit, like the config file.

const config = require('./config');
const apiRouter = require('./routes/api');

// Step 3 - Let's create the app

var app = express();

// Setup the 'view engine' for the app

app.set('views', path.join(__dirname, 'www', 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

// Middleware is used in the order it's defined.

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'www', 'public')));

// And now, defining some endpoints - ironically, by more middleware.

app.use('/api', apiRouter);

// If no middleware has returned by now *or* thrown an error,
// then it's a 404 error. Throw that.

app.use(function(req, res, next) {
  next(createError(404));
});

// Here's an error-handler. Could get errors from *any* of the above middleware.

app.use(function(err, req, res, next) {
  // I don't understand what this does.
  // This is express-generator boilerplate.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Step X - prepare for launch!

// Set the port that we shall listen on

var port = config.port;
app.set('port', port);

// Create the server

var server = http.createServer(app);

// Listen on the port, with some event handlers.

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// This is boilerplate that gives a nicer error message
// for the two most common errors.

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// This listener is for when the server is listening happily.

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
