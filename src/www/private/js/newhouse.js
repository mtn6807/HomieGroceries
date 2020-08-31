'use strict';

import * as auth from '/js/auth.js';

// When the page loads, do some setup
document.addEventListener("DOMContentLoaded", init);

// Add an event listener to the form
function init(){
	const form = document.querySelector("form");
	form.addEventListener("submit", formSubmitted);
}

// Let's submit the form by ourselves
async function formSubmitted(e){
	e.preventDefault();
	await auth.isReady().catch(()=>{
		// we're boned
		location.href = '/login';
	});
	// get the access token
	const accessToken = auth.getAccessToken();
	// Get some things related to the form
	const form = e.srcElement;
	const feedback = form.querySelector('.feedback');
	// Stop the form window change
	// Hide any error messages
	feedback.classList.add('no');
	// Extract the info
	const formData = new FormData(form);
	const body = {};
	for(var pair of formData.entries()) {
		body[pair[0]] = pair[1];
	}
	console.log('This is the newHouse request body', body);
	// Fire
	fetch('/api/v1/houses', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${accessToken}`
		}
	})
	.then(response=>response.json())
	.then(data=>{
		if(data.ok){
			// That's a valid login.
			// We have a refreshToken now.
			// Head on over to the application.
			location.href = '/houses';
		}else{
			// Oh jeez rick.
			// Fortunately, there's an error message
			// hidden in data.message. Let's show that.
			feedback.textContent = data.message;
			feedback.classList.remove('no');
		}
	});
}



async function checkAuthed(){
	// wait for ready
	await auth.isReady().catch(()=>{
		// we're boned
		location.href = '/login';
	});
}

document.addEventListener("DOMContentLoaded", checkAuthed);
