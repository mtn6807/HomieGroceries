'use strict';

function health(request, response) {
	response.status(200).json({ok: true});
}

module.exports = health;
