'use strict';

import * as auth from '/js/auth.js';

async function loadHouses(){
	// wait for ready
	await auth.isReady();
	// get the access token
	const accessToken = auth.getAccessToken();
	// hit the houses api
	console.log('Loading Houses');
	fetch('/api/v1/houses', {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	}).then(response=>response.json()).then(houses=>console.log);
	// throw those fuckers in the DOM
	// ...
}

document.addEventListener("DOMContentLoaded", loadHouses);
