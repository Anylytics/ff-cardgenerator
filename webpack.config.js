const webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname + "/src",
  entry: "./index",
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}