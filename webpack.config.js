const path = require('path');

module.exports = {
  mode: 'development',

  entry: './javascript/main.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'javascript')
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/auto'
      }
    ]
  }
};