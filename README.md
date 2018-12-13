# Error Overlay Webpack Plugin

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

Catch errors with style 💥✨

This plugin will display an error overlay in your application. It is the same error overlay used in [create-react-app](https://github.com/facebook/create-react-app).

- 📦 Webpack 4 support
- 🥞 Elegant stack trace
- 📝 Click to open error line in editor

<img src="https://raw.githubusercontent.com/smooth-code/error-overlay-webpack-plugin/master/docs/example.png" alt="Error Overlay Webpack Plugin Example">

```
npm install error-overlay-webpack-plugin --save-dev
```

## Usage

```js
// webpack.config.js
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
  entry: 'main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  plugins: [new ErrorOverlayPlugin()],
  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
}
```

## License

MIT

[build-badge]: https://img.shields.io/travis/smooth-code/error-overlay-webpack-plugin.svg?style=flat-square
[build]: https://travis-ci.org/smooth-code/error-overlay-webpack-plugin
[version-badge]: https://img.shields.io/npm/v/error-overlay-webpack-plugin.svg?style=flat-square
[package]: https://www.npmjs.com/package/error-overlay-webpack-plugin
[license-badge]: https://img.shields.io/npm/l/error-overlay-webpack-plugin.svg?style=flat-square
[license]: https://github.com/smooth-code/error-overlay-webpack-plugin/blob/master/LICENSE
