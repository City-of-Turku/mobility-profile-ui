const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const NODE_ENV = process.env.REACT_APP_NODE_ENV;
const isEnvProduction = NODE_ENV === 'production';
const isEnvDevelopment = !isEnvProduction;

module.exports = {
  entry: './src/index.tsx',
  mode: isEnvProduction ? 'production' : 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    hot: true,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
  },
  devtool: isEnvDevelopment ? 'source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png$/,
        type: 'asset/inline',
      },
      {
        test: /\.(jpg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
    }),
    new Dotenv(),
  ],
};
