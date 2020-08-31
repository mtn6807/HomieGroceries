'use strict';

const db = require('@root/db');

/**
@description Get all the houses with a given member
@param {string} email - get all houses containing this dude
@returns {Array<House>} could be empty
*/
async function getByMember(email){
	return await db.houses.getByMember(email);
}

async function create(name, creator){
	const house = {
		name,
		creator,
		createdAt: Date.now(),
		members: [
			creator
		]
	};
	db.houses.add(house);
}

module.exports = {
	getByMember,
	create
};
