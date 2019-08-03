const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          },
          // options: {
          //   presets: ['babel-preset-env', 'babel-preset-react'],
          //   plugins: ["react-hot-loader/babel"],
          // },
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.png$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'file-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devServer: {
    hot: true,
  },
}
// "@babel/core": "^7.1.0",
// "@babel/polyfill": "^7.0.0",
// "@babel/preset-env": "^7.1.0",
// "@babel/preset-react": "^7.0.0",
// "babel-loader": "^8.0.2"