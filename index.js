'use strict';
var fs = require('fs');
var imgur = require('imgur');
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
					console.log('imgmin');
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
