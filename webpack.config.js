const path = require('path');

const isDemo = process.env.DEMO;

module.exports = {
  entry: isDemo ? './demo.js' : './src/index.js',
  output: {
    filename: isDemo ? 'demo-bundle.js' : 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
};
