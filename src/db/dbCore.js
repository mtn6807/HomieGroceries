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

module.exports = {
	getClient
};
