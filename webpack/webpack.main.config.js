// Electron Main Process configuration
const path = require('path');
const webpack = require('webpack');

const paths = {
  source: path.resolve('main'),
  output: path.resolve('dist'),
};

const indexUrl = () => {
  if(process.env.NODE_ENV === 'development') {
    return "http://0.0.0.0:8080/";
  }
}

module.exports = {
  target: 'electron-main',

  context: paths.source,
  entry: [
    'babel-polyfill',
    'index.js',
  ],
  output: {
    path: paths.output,
    filename: 'main.js',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['main', 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: (process.env.NODE_ENV === 'production' ? null : 'source-map'),
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
