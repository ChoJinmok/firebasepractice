const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (_, argv) => {
  dotenv.config();

  return {
    entry: path.resolve(__dirname, 'src/index.jsx'),
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
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        NODE_ENV: JSON.stringify(argv.mode),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        templateParameters: {
          base: argv.mode ? '/' : '/firebasepractice',
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        templateParameters: {
          base: argv.mode ? '/' : '/firebasepractice',
        },
        filename: '404.html',
      }),
    ],
    // output: {
    //   path: path.resolve(__dirname, 'build'),
    // },
  };
};
