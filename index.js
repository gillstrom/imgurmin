'use strict';

var fs = require('fs');
var imgur = require('imgur');
var isImage = require('is-image');
var Imagemin = require('imagemin');

module.exports = function (img, cb) {
	if (!isImage(img)) {
		cb(new Error('Expected an image'));
		return;
	}

	fs.stat(img, function (err, stats) {
		if (err && err.code === 'ENOENT') {
			cb(new Error('Image doesn\'t exist'));
			return;
		}

		if (err) {
			cb(err);
			return;
		}

		new Imagemin()
			.src(img)
			.run(function (err, files) {
				if (err) {
					cb(err);
					return;
				}

				var b = new Buffer(files[0].contents, 'base64');

				imgur.uploadBase64(b)
					.then(function (res) {
						cb(null, res.data.link);
						return;
					})
					.catch(function (err) {
						cb(err);
						return;
					});
			});
	});
};
