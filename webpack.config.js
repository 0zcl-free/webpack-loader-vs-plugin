const path = require('path');
const ZipPlugin = require('./plugins/zip-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve('./loaders/a-loader'),
          path.resolve('./loaders/b-loader')
        ]
      }
    ]
  },
  plugins: [
    new ZipPlugin({
      filename: 'offline'
    })
  ]
}