'use strict';

const services = require('@root/services');

async function get(request, response){
	// Get all the houses, yo.
	const email = request.requester;
	const houses = await services.houses.getByMember(email);
	response.json(houses);
}

async function create(request, response){
	const houseName = request.body.name;
	const creator = request.requester;
	await services.houses.create(houseName, creator);
	response.json({ok:true});
}

module.exports = {
	get,
	create
}
