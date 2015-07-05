#!/usr/bin/env node
'use strict';
var meow = require('meow');
var imgurmin = require('./');

var cli = meow({
	help: [
		'Usage',
		'	$ imgurmin <path-to-image>'
	]
});

if (!cli.input.length) {
	console.error('Image is required');
	process.exit(1);
}

imgurmin(cli.input[0], function (err, res) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log(res);
});
