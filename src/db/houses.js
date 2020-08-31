'use strict';

const dbCore = require('./dbCore');

/**
@description get all the houses that a user is in
@param {string} email - the email of the user we're checking
*/
async function getByMember(email){
	const client = await dbCore.getClient();
	const houses = await client
		.db('HG')
		.collection('houses')
		.find({members: email})
		.toArray();
	return houses;
}

async function add(house){
	const client = await dbCore.getClient();
	return await client
		.db('HG')
		.collection('houses')
		.insertOne(house);
}

module.exports = {
	getByMember,
	add
};
