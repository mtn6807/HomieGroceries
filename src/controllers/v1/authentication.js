'use strict';

const createError = require('http-errors');
const services = require('@root/services');
const config = require('@config');
const logger = require('@root/util/logger');

// There's a user - they click register
async function register(request, response) {
	const registerSuccessful = await services.authentication.register(
		request.body.email,
		request.body.displayName,
		request.body.password,
		request.body.isHomie
	);
	if(registerSuccessful !== true){
		// rS is a string if something went wrong
		throw createError(400, registerSuccessful);
	}
	const refreshToken = await services.authentication.getRefreshToken(request.body.email);
	response.cookie('refreshToken', refreshToken, {
		maxAge: config.tokens.refreshLifetime * 1000,
		httpOnly: true,
		//secure: true,
		sameSite: 'Strict'
	}).redirect(301, '/api/v1/refresh');
}

// The user wants to login - grants a refresh token
async function login(request, response) {
	const loginSuccessful = await services.authentication.login(
		request.body.email,
		request.body.password
	);
	if(!loginSuccessful){
		throw createError(400, 'login failed');
	}
	const refreshToken = await services.authentication.getRefreshToken(request.body.email);
	response.cookie('refreshToken', refreshToken, {
		maxAge: config.tokens.refreshLifetime * 1000,
		httpOnly: true,
		//secure: true,
		sameSite: 'Strict'
	}).redirect(301, '/api/v1/refresh');
}

// The user wants to logout
async function logout(request, response) {
	// Delete their tokens
	// Options must be identical
	response
		.clearCookie('refreshToken', {
			maxAge: config.tokens.refreshLifetime * 1000,
			httpOnly: true,
			//secure: true,
			sameSite: 'Strict'
		})
		.clearCookie('accessToken', )
		.redirect(301, '/');
}

// If you have a valid refresh token, this grants a new access_token
async function refresh(request, response) {
	console.log(request.cookies);
	console.log(request.cookies.refreshToken);
	const refreshToken = request.cookies.refreshToken;
	logger.debug(`Refresh token is ${refreshToken}`);
	const refreshIsValid = await services.authentication.refresh(refreshToken);
	if(refreshIsValid===false){
		throw createError(400, "Invalid refresh token");
	}
	// refreshIsValid contains the decoded refresh token
	const email = refreshIsValid.email;
	const newRefreshToken = await services.authentication.getRefreshToken(email);
	const accessToken = await services.authentication.getAccessToken(email);
	// Yee
	response
		.cookie('refreshToken', newRefreshToken, {
			maxAge: config.tokens.refreshLifetime * 1000,
			httpOnly: true, // no js access
			//secure: true, // https only
			sameSite: 'Strict' // only share with me
		})
		.cookie('accessToken', accessToken, {
			maxAge: config.tokens.accessLifetime * 1000,
			httpOnly: false, // the app needs this
			//secure: true,
			sameSite: 'Strict'
		})
		.redirect(301, '/houses');
}

// Used as a middleware, this checks the auth header for a valid access token
async function checkAuthed(request, response, next){
	const authHeader = request.get('Authorization');

	const fail = ()=>{
		response.status(401);
		response.set('WWW-Authenticate','Bearer');
		response.end();
	};

	// Make sure the header's there
	if(authHeader===undefined){
		console.log('No auth header');
		fail();
		return;
	}
	// Make sure it's the right format
	if(!authHeader.match(/Bearer .+/)){
		console.log('Does not match regex1');
		fail();
		return;
	}
	// Extract the shitter
	const token = authHeader.split(/ (.+)/)[1];
	// Check it against the jwt wangjangler
	const valid = await services.tokens.verifyToken(token).catch(e=>false);

	if(!valid){
		console.log('Got token, is invalid');
		console.log(authHeader);
		console.log(token);
		console.log(valid);
		fail();
		return;
	}
	// It passed - record the user for later
	request.requester = valid.email;
	// Continue
	next();
}

module.exports = {
	register,
	login,
	logout,
	refresh,
	checkAuthed
};
