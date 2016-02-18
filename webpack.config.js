const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: '.',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'app.js'
  },
  module: {
    loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"},
        { test: /\.styl$/, exclude: /node_modules/, loader: "style!css!autoprefixer!stylus"}
    ]
  }
}
