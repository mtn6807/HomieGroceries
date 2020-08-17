'use strict';

// Controllers are http request handlers
// Translate between internal services and http things
// That's all they do.

async function health(request, response) {
	response.status(200).json({ok: true});
}

module.exports = {
	health
};
