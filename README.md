# imgurmin

> Run an image through imagemin and upload it to Imgur


## Install

```
$ npm install --save imgurmin
```


## Usage

```js
var imgurmin = require('imgurmin');

imgurmin('image.jpg', function (err, res) {
	console.log(res);
	// => http://i.imgur.com/xxxxxx.jpg
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
