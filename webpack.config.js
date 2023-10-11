const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const NODE_ENV = process.env.REACT_APP_NODE_ENV;
  const isEnvProduction = NODE_ENV === 'production';
  const isEnvDevelopment = !isEnvProduction;

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
    }),
    new Dotenv(),
  ];

  if (isEnvProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    );
  }

  return {
    entry: './src/index.tsx',
    mode: isEnvProduction ? 'production' : 'development',
    target: 'web',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devServer: {
      port: 8080,
      hot: true,
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      historyApiFallback: true,
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
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
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
    plugins: plugins,
  };
};
