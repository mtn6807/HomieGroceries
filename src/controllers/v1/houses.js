'use strict';

const services = require('@root/services');

async function get(request, response){
	// Get all the houses, yo.
	const email = request.requester;
	const houses = await services.houses.getByMember(email);
	response.json(houses);
}

module.exports = {
	get
}
