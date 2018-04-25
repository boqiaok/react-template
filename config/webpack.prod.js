const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].min.[hash:8].css',
  allChunks: true,
})

const config = {
  mode: 'production',
  entry: {
    index: path.resolve('src/app.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: 'scripts/index-[hash:6].min.js',
    publicPath: '/',
  },
  module: {
    // 加载器配置
    rules: [
      {
        test: /\.scss|.css$/,
        include: [path.resolve('src')],
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                camelCase: true,
                minimize: true,
                localIdentName: '[name]_[local]_[hash:base64:3]',
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
            },
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
          ],
        }),
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
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'dist/img/[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    extractSass,
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
      hash: false,
      outputPath: 'dll',
      publicPath: 'dll',
      includeSourcemap: false,
    }),
  ],
}

module.exports = config
