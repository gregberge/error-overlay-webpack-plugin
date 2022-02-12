const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('../dist/index.cjs')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      process: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process',
    }),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin(),
  ],
  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
  devServer: {
    port: 8080,
    open: true,
  },
}
