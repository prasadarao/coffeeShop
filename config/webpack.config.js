'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    context: path.join(__dirname, "..", "dist"),
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, '../src/index.js')
    ],
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: '../src/layout/index.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
          },
          {
              test: /\.js?$/,
              exclude: /node_modules/,
              loader: 'babel'
          },
          {
              test: /\.json?$/,
              loader: 'json'
          },
          {
              test: /\.scss$/,
              loader: 'style!css!sass'
          },
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
      root: path.join(__dirname, "..", "src"),
      extensions: ["", ".js", ".jsx", ".scss", ".png", ".svg", ".jpg"],
      modulesDirectories: [
        "src",
        "node_modules",
        "dist",
      ],
    }
};