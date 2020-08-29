const config = require('../config');
const jwt = require('jsonwebtoken');

async function signToken(token, lifetime) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			token,
			config.tokens.secret,
			{
				algorithm: 'HS256',
        		expiresIn: lifetime
			},
			(err, signed) => {
				if (err) {
					reject(err);
				}

				resolve(signed);
			}
		);
	});
}

/**
@description validates a JWT
@param {String} token - le token
@returns {promise} resolves to decoded token if legit
@throws {error} if the token aint it, chief.
*/
async function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			config.tokens.secret,
			(error, decoded) => {
				if (error) {
					reject(error);
				}

				resolve(decoded);
			}
		);
	});
}

module.exports = {
	signToken,
	verifyToken
};
