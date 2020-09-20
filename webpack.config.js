const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'AUTH_AUDIENCE': '',
      'AUTH_CLIENT_ID': '',
      'AUTH_DOMAIN': '',
      'AUTH_REDIRECT_URI': '',
      'AUTH_RESPONSE_TYPE': '',
      'AUTH_SCOPE': '',
      'ENVELOPE_API_URL': 'http://localhost:8033',
      'NODE_ENV': 'development'
    })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};