const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'scr/index.jsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    estenstions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
