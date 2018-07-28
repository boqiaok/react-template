const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const common = require('./index')

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: path.resolve('src/app.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: 'scripts/[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /(\.scss|\.css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      template: path.resolve('config/index.html'),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, './vendor_manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve('dist/dll/vendor.min.js'),
      hash: false,
      outputPath: 'dll',
      publicPath: 'dll',
      includeSourcemap: false,
    }),
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: {
      version: false,
      hash: false,
      maxModules: 0,
    },
    compress: false,
    clientLogLevel: 'none',
    port: common.port,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    inline: true,
    hotOnly: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
}

module.exports = config
