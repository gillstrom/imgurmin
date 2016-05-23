'use strict';
const fs = require('fs');
const imgurUploader = require('imgur-uploader');
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageType = require('image-type');
const pify = require('pify');
const fsP = pify(fs);

module.exports = input => {
	const read = typeof input === 'string' ? fsP.readFile(input) : Promise.resolve(input);

	return read
		.then(buf => {
			if (!imageType(buf)) {
				throw new Error('Expected an image');
			}

			return imagemin.buffer(buf, {
				plugins: [
					imageminGifsicle(),
					imageminJpegtran(),
					imageminOptipng(),
					imageminSvgo()
				]
			});
		})
		.then(buf => imgurUploader(buf))
		.then(res => res.link);
};
