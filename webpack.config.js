/*const path = require('path');

module.exports = {
  mode: 'development',

  entry: './javascript/main.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'javascript')
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js'],
    mainFields: ['module', 'main']
  }
};*/

require('dotenv').config();
const webpack = require('webpack');

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
  },

  resolve: {
    extensions: ['.js'],
    mainFields: ['module', 'main']
  },

  // firebase file will work and API_KEY is assigned the hidden variable
  plugins: [
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY)
    })
  ]
};