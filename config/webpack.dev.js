const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const common = require('./index')

const config = {
  mode: 'development',
  // devtool: 'source-map',
  devtool: 'cheap-module-source-map',
  entry: {
    index: path.resolve('src/app.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: 'scripts/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      Components: path.resolve('src/components'),
      Config: path.resolve('src/config'),
      Router: path.resolve('src/router'),
      Store: path.resolve('src/store'),
      Views: path.resolve('src/views'),
      Styles: path.resolve('src/styles'),
      Utils: path.resolve('src/utils'),
      Root: path.resolve('./'),
    },
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
      publicPath: '/dll',
      includeSourcemap: false,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve('static'),
        to: path.resolve('dist/static'),
        ignore: ['.*'],
        cache: true,
      },
    ]),
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
    open: true,
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
