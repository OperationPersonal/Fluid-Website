var webpack = require('webpack');

module.exports = {
  watch: true,
  entry:{
    'index': './public/js/index.jsx',
    'restaurant/dashboard': './public/js/restaurant/dashboard.jsx'
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /public/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins:['transform-class-properties'],
          presets:['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'commons',
      filename: 'commons.bundle.js',
      minChunks: 2
    })
  ]
};
