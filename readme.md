# imgurmin [![Build Status](https://travis-ci.org/gillstrom/imgurmin.svg?branch=master)](https://travis-ci.org/gillstrom/imgurmin)

> Upload a minified image to imgur.com


## Install

```
$ npm install --save imgurmin
```


## Usage

```js
const imgurmin = require('imgurmin');

imgurmin('image.jpg').then(res => {
	console.log(res);
	//=> http://i.imgur.com/xxxxxx.jpg
});
```


## CLI

```
$ npm install --global imgurmin
```

```
$ imgurmin --help

  Usage
    $ imgurmin <path-to-image>
```


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
