'use strict';

const config = require('@config');
const database = require('@root/db');
const bcrypt = require('bcrypt');
const tokens = require('./tokens');

/**
@description checks if something email-ey is actually an email
@param {string} email - a supposed email address
@returns {bool} - if it's an email
*/
function isEmailValid(email) {
	return !!email.match(/\S+@\S+\.\S+/);
}

/**
@description checks if an email is in use by a user
@param {string} email - the email to check
@returns {bool} - if it's in use
*/
async function isEmailTaken(email) {
	const user = await database.users.getByEmail(email);
	return user !== null;
}

/**
@description tests if a password conforms to a password policy
@param {string} password - the password to check
@returns {bool} true/false isValid
*/
function isPasswordValid(password) {
	let upperCase = 0;
	let lowerCase = 0;
	let numbers = 0;
	let special = 0;
	let invalid = 0;
	let length = 0;

	password.split('').map(c => c.charCodeAt(0)).forEach(n => {
		length++;
		if (n < 32) {
			invalid++;
		}

		if (n >= 32 && n <= 47) {
			special++;
		}

		if (n >= 48 && n <= 57) {
			numbers++;
		}

		if (n >= 58 && n <= 64) {
			special++;
		}

		if (n >= 65 && n <= 90) {
			upperCase++;
		}

		if (n >= 91 && n <= 96) {
			special++;
		}

		if (n >= 97 && n <= 122) {
			lowerCase++;
		}

		if (n >= 123 && n <= 126) {
			special++;
		}

		if (n >= 127) {
			invalid++;
		}
	});

	return invalid === 0 &&
		length >= config.passwords.policy.minLength &&
		special >= config.passwords.policy.minSpecialChars &&
		numbers >= config.passwords.policy.minNumbers;
}

/**
@description log a user in
@param {string} email - their email
@param {string} password - their password
@returns {bool} success
*/
async function login(email, password) {
	// User's gotta exist
	const user = await database.users.getByEmail(email);
	if (user === null) {return false;}

	// Password's gotta be valid
	const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
	if (!passwordIsValid) {return false;}

	// Yeet - login successful!
	return true;
}

/**
@description get a refresh token for an email
@param {string} email - the email of the user
@returns {string} the refresh token
*/
async function getRefreshToken(email){
	const token = {email};
	const signedToken = await tokens.signToken(token, config.tokens.refreshLifetime * 1000);
	return signedToken;
}

/**
@description registers a new user
@param {string} email - dinoNuggies@hotmail.com
@param {string} displayName - xXx_heckerman_xXx
@param {string} password - what's ur password bro?
@param {bool} isHomie - are they a homie?
@returns {bool} true - when successful
@returns {string} reason - when there's a problem
*/
async function register(email, displayName, password, isHomie) {
	// They gotta be a homie.
	if (!isHomie) {
		return 'Homie Groceries is for Homies Only!';
	}

	// The email has to be valid
	const emailIsValid = await isEmailValid(email);
	if (!emailIsValid) {
		return 'What a shitty email.';
	}

	// The email has to be available
	const emailIsTaken = await isEmailTaken(email);
	if (emailIsTaken) {
		return 'That email has already been taken, bitch.';
	}

	// That password's gotta be chill.
	const passwordIsValid = isPasswordValid(password);
	if (!passwordIsValid) {
		return 'What a shitty password.';
	}

	// Are users allowed to put html in their displaynames?
	// yes

	// Hash le password
	const passwordHash = await bcrypt.hash(password, config.passwords.saltRounds);

	// Throw 'em in the DB
	await database.users.create(email, displayName, passwordHash);

	// That's a fact, jack.
	return true;
}

/**
@description checks the validity of a refresh token
@param {string} refreshToken - a suspected refresh token
@returns {Promise.<string>} email - the user's email address, if valid
@returns {Promise.<bool>} false - if invalid
*/
async function refresh(refreshToken) {
	return tokens.verifyToken(refreshToken).catch(e=>{
		return false;
	});
}

/**
@description signs an access token for a user
@param {string} email - the user that this is for
@returns {Promise.<string>} - a signed access token
*/
async function getAccessToken(email){
	console.log('setting access token for user');
	console.log(email);
	return await tokens.signToken({email}, config.tokens.accessLifetime);
}

module.exports = {
	login,
	register,
	refresh,
	getRefreshToken,
	getAccessToken
};
