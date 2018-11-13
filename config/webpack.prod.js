const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const defaultConfig = require('./index')

const config = {
  mode: 'production',
  entry: {
    index: path.resolve('src/app.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: 'scripts/[name]-[hash:6].min.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
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
    // 加载器配置
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: [path.resolve('src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                precss(),
                autoprefixer({ browsers: ['IE >= 9'] }),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /(\.jsx|\.js)$/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].min.[hash:8].css',
      chunkFilename: 'css/[id].min.[hash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: 'config/index.html',
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
      filename: 'index.html',
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, './vendor_manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve('dist/dll/vendor.min.js'),
      hash: true,
      outputPath: 'dll',
      publicPath: 'dll',
      includeSourcemap: false,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve('static'),
        to: path.resolve('dist/static'),
        ignore: ['.*'],
      },
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
}

if (defaultConfig.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
