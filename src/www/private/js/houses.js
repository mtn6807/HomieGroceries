'use strict';

import * as auth from '/js/auth.js';

import {html, render} from 'https://unpkg.com/lit-html?module';

async function loadHouses(){
	// wait for ready
	await auth.isReady();
	// get the access token
	const accessToken = auth.getAccessToken();
	// hit the houses api
	console.log('Loading Houses');
	const houses = await fetch('/api/v1/houses', {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	}).then(response=>response.json());
	// throw those fuckers in the DOM
	console.log('Loaded Houses: ', houses);
	const housesList = houses.length === 0
		? html`<p>You are not in any houses.</p>`
		: html`${houses.map(house=>html`
			<div class="house">
				${house.name} (${house.members.length} members)
			</div>
		`)}`;
	render(housesList, document.querySelector('#houses'));
}

document.addEventListener("DOMContentLoaded", loadHouses);
