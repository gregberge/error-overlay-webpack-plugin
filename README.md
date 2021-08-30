# Error Overlay Webpack Plugin

![Node.js CI](https://github.com/gregberge/error-overlay-webpack-plugin/workflows/Node.js%20CI/badge.svg)

Catch errors with style 💥✨

This plugin will display an error overlay in your application. It is the same error overlay used in [create-react-app](https://github.com/facebook/create-react-app).

- 📦 Webpack 5 support
- 🥞 Elegant stack trace
- 📝 Click to open error line in editor

<img src="https://raw.githubusercontent.com/gregberge/error-overlay-webpack-plugin/master/docs/example.png" alt="Error Overlay Webpack Plugin Example">

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
