const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonConfig = require('./webpack.config');

const extractSass = new ExtractTextPlugin({
  filename: "style.css",
  disable: process.env.NODE_ENV !== "production"
});

commonConfig.devtool = undefined;
// typescript
commonConfig.module.rules[0] = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
};
// scss
commonConfig.module.rules[1].use = extractSass.extract({
  use: [{
    loader: "css-loader" // translates CSS into CommonJS
  }, {
    loader: "sass-loader", // compiles Sass to CSS
  }]
});
commonConfig.plugins[0] = extractSass;

module.exports = commonConfig;
