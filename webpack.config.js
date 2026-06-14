const path = require('path');

module.exports = {
  mode: 'development',
  entry: './co/javascript/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './javascript')
  },
};