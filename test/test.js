'use strict';
var path = require('path');
var test = require('ava');
var imgurmin = require('../');

test(function (t) {
	t.plan(2);

	imgurmin(path.join(__dirname, 'fixtures/test.jpg'), function (err, res) {
		t.assert(!err, err);
		t.assert(typeof res, 'string');
	});
});
