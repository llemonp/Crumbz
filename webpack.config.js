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

  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_KEY": JSON.stringify(process.env.API_KEY)
    })
  ]
};