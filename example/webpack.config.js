const path = require('path')
// eslint-disable-next-line import/no-unresolved
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('../lib')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new ErrorOverlayPlugin(), new HtmlWebpackPlugin()],
  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
  devServer: {
    port: 8080,
    open: true,
  },
}
