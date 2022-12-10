const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
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
      proxy: {
        '/api': {
          target: 'https://nextjsintro-flame.vercel.app',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        publicPath: '/',
      }),
    ],
    // output: {
    //   path: path.resolve(__dirname, 'build'),
    // },
  };
};
