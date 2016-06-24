const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  entry: [
    './app/index.js',
  ],
  target: 'node',
  module: {
    loaders: [
      { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false,
    }),
  ],
  devtool: 'sourcemap',
};
