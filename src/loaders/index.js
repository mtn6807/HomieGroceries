'use strict';

// Right now, there's only one thing to load.

const loadExpress = require('@root/loaders/load-express');
const loadHTTP = require('@root/loaders/load-http');

/**
@desription returns loaded components for the application
*/
async function load() {
	const express = await loadExpress.load();
	const http = await loadHTTP.load();
	return {
		express,
		http
	}
}

module.exports = {
	load
};
