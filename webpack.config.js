const path = require('path');

module.exports = {
  watch: true,
  entry: ['babel-polyfill', './src/js/chart.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve('public/js/')
  },
  module: {
      rules: [
        {
          // test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }
      ]
    }
};
