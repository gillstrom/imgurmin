'use strict';
var fs = require('fs');
var imgurUploader = require('imgur-uploader');
var Imagemin = require('imagemin');
var imageType = require('image-type');
var readChunk = require('read-chunk');

module.exports = function (img, cb) {
	fs.stat(img, function (err, stats) {
		if (err && err.code === 'ENOENT') {
			cb(new Error('Image doesn\'t exist'));
			return;
		}

		if (err) {
			cb(err);
			return;
		}

		if (!imageType(readChunk.sync(img, 0, 12))) {
			cb(new Error('Expected an image'));
			return;
		}

		new Imagemin()
			.src(img)
			.run(function (err, files) {
				if (err) {
					cb(err);
					return;
				}

				imgurUploader(files[0].contents, function (err, res) {
					if (err) {
						cb(err);
						return;
					}

					cb(null, res.link);
				});
			});
	});
};
