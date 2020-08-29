'use strict';

const createError = require('http-errors');
const services = require('@root/services');
const config = require('@config');

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
	const refreshToken = services.authentication.getRefreshToken(request.body.email);
	response.cookie('refreshToken', refreshToken, {
		maxAge: config.tokens.refreshLifetime * 1000,
		httpOnly: true,
		secure: true,
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
	const refreshToken = services.authentication.getRefreshToken(request.body.email);
	response.cookie('refreshToken', refreshToken, {
		maxAge: config.tokens.refreshLifetime * 1000,
		httpOnly: true,
		secure: true,
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
			secure: true,
			sameSite: 'Strict'
		})
		.clearCookie('accessToken', )
		.redirect(301, '/');
}

// If you have a valid refresh token, this grants a new access_token
async function refresh(request, response) {
	const refreshToken = request.cookie.refreshToken;
	const refreshIsValid = await services.authentication.refresh(refreshToken);
	if(refreshIsValid===false){
		throw createError(400, "Invalid refresh token");
	}
	// refreshIsValid contains the email address
	const newRefreshToken = await services.authentication.getRefreshToken(refreshIsValid);
	const accessToken = await services.authentication.getAccessToken(refreshIsValid);
	// Yee
	response
		.cookie('refreshToken', newRefreshToken, {
			maxAge: config.tokens.refreshLifetime * 1000,
			httpOnly: true, // no js access
			secure: true, // https only
			sameSite: 'Strict' // only share with me
		})
		.cookie('accessToken', accessToken, {
			maxAge: config.tokens.accessLifetime * 1000,
			httpOnly: false, // the app needs this
			secure: true,
			sameSite: 'Strict'
		})
		.redirect(301, '/app.html');
}

module.exports = {
	register,
	login,
	logout,
	refresh
};
