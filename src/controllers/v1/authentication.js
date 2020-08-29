'use strict';

// Const createError = require('http-errors');
const services = require('@root/services');
const config = require('@config');

// There's a user - they click register
async function register(request, response) {
	const refreshToken = await services.authentication.register(
		request.body.email,
		request.body.displayName,
		request.body.password,
		request.body.isHomie
	);
	response.cookie('refreshToken', refreshToken, {
		maxAge: config.tokens.refreshLifetime * 1000,
		httpOnly: true,
		secure: true,
		sameSite: 'Strict'
	}).redirect(301, '/api/v1/refresh');
}

// The user wants to login - grants a refresh token
async function login(request, response) {
	const refreshToken = await services.authentication.login(
		request.body.email,
		request.body.password
	);
	response.cookie('refreshToken', refreshToken, {
		maxAge: config.tokens.refreshLifetime * 1000,
		httpOnly: true,
		secure: true,
		sameSite: 'Strict'
	}).redirect(301, '/api/v1/refresh');
}

// The user wants to logout
async function logout(request, response) {
	// Delete their refresh token
}

// If you have a valid refresh token, this grants a new access_token
async function refresh(request, response) {
	// Extract info for the refresh service (refresh token)
	// Use the refresh service to get a new access token
}

module.exports = {
	register,
	login,
	logout,
	refresh
};
