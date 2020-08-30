'use strict';

const dbCore = require('./dbCore');

async function getByEmail(email) {
	const client = await dbCore.getClient();
	const user = await client
		.db('HG')
		.collection('users')
		.findOne({email});
	console.log(`Search for ${email} returns ${user}`);
	return user;
}

async function create(email, displayName, passwordHash) {
	const client = await dbCore.getClient();
	return await client
		.db('HG')
		.collection('users')
		.insertOne({email, displayName, passwordHash});
}

module.exports = {
	getByEmail,
	create
};
