module.exports = {
	port: 3000,
	logger: {
		level: 'debug'
	},
	database: {
		uri: 'mongodb://127.0.0.1:27017/'
	},
	passwords: {
		saltRounds: 3,
		policy: {
			minLength: 8,
			minSpecialChars: 1,
			minNumbers: 1
		}
	},
	tokens: {
		secret: 'powersergthisisthesecretfuckyouscott.com',
		accessLifetime: '120', // Two minutes for access tokens
		refreshLifetime: '604800' // 1 week for refresh tokens
	}
};
