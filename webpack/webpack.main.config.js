// Electron Main Process configuration
const path = require('path');
const webpack = require('webpack');

const indexUrl = () => {
  if(process.env.NODE_ENV === 'development') {
    return "http://0.0.0.0:8080/";
  }
}

module.exports = {
  target: 'electron',

  context: path.resolve(__dirname, "..", "main"),
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, "..", "main"),
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    '7zip': 'commonjs 7zip'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        INDEX_URL: JSON.stringify(indexUrl())
      },
    }),
  ],
};
