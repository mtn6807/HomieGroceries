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

module.exports = {
	getByMember
};
