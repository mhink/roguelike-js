const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  source: path.resolve('client'),
  output: path.resolve('dist')
}

module.exports = {
  target: 'electron-renderer',
  devtool: 'source-map',
  entry: [
    "babel-polyfill",
    "index.js"
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'error-only',
    host: '0.0.0.0',
    port: 8080
  },
  context: paths.source,
  output: {
    path: paths.output,
    filename: 'renderer.[name].js',
    chunkFilename: 'renderer.[name].chunk.js',
    publicPath: `http://0.0.0.0:8080/`

  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&importLoaders=1',
          'postcss'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    })
  ]
}
