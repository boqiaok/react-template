const path = require('path')
const webpack = require('webpack')

const vendors = [
  'react',
  'react-dom',
  'react-router-dom',
  'prop-types',
  'mobx',
  'mobx-react',
  'axios',
]

const options = {
  mode: 'production',
  entry: {
    vendor: vendors,
  },
  output: {
    publicPath: '/',
    path: path.resolve('dist/dll'),
    filename: 'vendor.min.js',
    library: 'library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]_manifest.json'),
      name: 'library',
      context: __dirname,
    }),
  ],
}

module.exports = options
