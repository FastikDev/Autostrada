const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[hash][ext]',
      publicPath: '/', // полезно при использовании historyApiFallback
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s?css$/, // .css и .scss
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
            }),
          ]
        : []),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 3001,

      allowedHosts: 'all',
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    mode: isProduction ? 'production' : 'development',
  };
};