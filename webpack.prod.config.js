const path = require('path');
const commonConfig = require('./webpack.config');

commonConfig.devtool = undefined;
// typescript
commonConfig.module.rules[0] = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
};

module.exports = commonConfig;
