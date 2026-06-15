const path = require('path');
const webpack = require('webpack');

require('dotenv').config({
  path: path.resolve(__dirname, 'src/.env')
});

console.log("API_KEY from env:", process.env.API_KEY);

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