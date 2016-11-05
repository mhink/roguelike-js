const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'electron',
  devtool: 'source-map',
  entry: "main.js",
  devServer: {
    historyApiFallback: true,
    stats: 'error-only',
    host: '0.0.0.0',
    port: 8080
  },
  context: path.resolve(__dirname, "..", "client"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: 'renderer.[name].js',
    chunkFilename: 'renderer.[name].chunk.js',
    publicPath: `http://0.0.0.0:8080/`

  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, "..", "client"),
      'node_modules'
    ]
  },
  resolveLoader: {
    modules: ['loader_modules', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.map$/,
        use: ['json', 'tile']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
  ]
}
