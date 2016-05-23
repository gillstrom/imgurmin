#!/usr/bin/env node
'use strict';
const meow = require('meow');
const imgurmin = require('./');

const cli = meow(`
	Usage
		$ imgurmin <path-to-image>
`);

if (!cli.input.length) {
	console.error('Image is required');
	process.exit(1);
}

imgurmin(cli.input[0]).then(console.log);
