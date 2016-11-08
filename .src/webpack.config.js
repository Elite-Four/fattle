const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  context: path.join(__dirname, ''),
  entry: './components',
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'app.js'
  },
  module: {
    loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"},
        { test: /\.json?$/, exclude: /node_modules/, loader: "json"},
        { test: /\.styl$/, exclude: /node_modules/, loader: "style!css!postcss!stylus"}
    ]
  },
  postcss: [autoprefixer]
}
