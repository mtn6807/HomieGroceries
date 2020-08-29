'use strict';

const config = require('@config');
const {MongoClient} = require('mongodb');

const _client = new MongoClient(config.database.uri, {
	useUnifiedTopology: true
});

async function getClient(){
	if(!_client.isConnected()){
		await _client.connect();
	}

	return _client;
}

async function getUser(email) {
	const client = await getClient();
	const user = await client
		.db('HG')
		.collection('users')
		.findOne({email});
	console.log(`Search for ${email} returns ${user}`);
	return user;
}

async function createUser(email, displayName, passwordHash) {
	const client = await getClient();
	return await client
		.db('HG')
		.collection('users')
		.insertOne({email, displayName, passwordHash});
}

module.exports = {
	getUser,
	createUser
};
