'use strict';

import * as auth from '/js/auth.js';

async function loadHouses(){
	// wait for ready
	await auth.isReady();
	// get the access token
	const accessToken = auth.getAccessToken();
	// hit the houses api
	const houses = await fetch('/api/v1/houses', {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	}).then(response=>response.json());
	return houses;
}

async function createNewHouse(house){
	return fetch('/api/v1/houses', {
		method: 'POST',
		body: JSON.stringify(house),
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${accessToken}`
		}
	})
	.then(response=>response.json());
}

export {
	get: loadHouses,
	create: createNewHouse
};
