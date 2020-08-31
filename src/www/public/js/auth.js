'use strict';

/**
@description gets a cookie
@param {string} cookie - the cookie to get
@returns {string} the cookie's value
@returns {undefined} if not found
*/
function getCookie(cookie){
	const keyval = document
		.cookie
		.split('; ')
		.find(r=>r.startsWith(cookie));
	if(keyval===undefined) return undefined;
	const val = keyval.split('=')[1].trim();
	return decodeURIComponent(val);
}

/**
@description get the access token from the cookies
@returns {string} the access token
@returns {bool} false - if there's not access token
*/
function getAccessToken(){
	const accessToken = getCookie('accessToken');
	console.log(`Access Token is ${accessToken}`);
	return accessToken;
}

/**
@description Make sure the access token is ready for action
@returns {Promise} resolves when ready
When something goes wrong, bails to login page.
*/
async function isReady(){
	return new Promise((resolve, reject)=>{
		// If we're good, we're good.
		if(getAccessToken()!==undefined) resolve();
		// uh oh. Try the refresh endpoint, should work.
		fetch('/api/v1/refresh', {
			credentials: "same-origin",
		})
		.then(response=>response.json())
		.then(data=>{
			if(data.ok){ // We've been refreshed!
				resolve();
			}else{ // Nope, shit's fucked bro.
				reject();
			}
		});
	});
}


export {
	getAccessToken,
	isReady
};
