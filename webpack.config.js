const path = require('path');
const webpack = require('webpack');

var config = {
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
      AUTH_AUDIENCE: '',
      AUTH_CLIENT_ID: '',
      AUTH_DOMAIN: '',
      AUTH_REDIRECT_URI: '',
      AUTH_RESPONSE_TYPE: '',
      AUTH_SCOPE: '',
      ENVELOPE_API_URL: 'http://localhost:8083',
      NODE_ENV: 'development' // use 'development' unless process.env.NODE_ENV is defined
    })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = (env, argv) => {

  // loads all values from .env into process.env
  console.log('Build mode: ', argv.mode);
  if (argv.mode === 'development') {
    console.log('loading_dev_env_config')
    require('dotenv').config({path: path.resolve(process.cwd(), '.env.development')});
  } else {
    console.log('loading_prod_env_config')
    require('dotenv').config({path: path.resolve(process.cwd(), '.env')});
  }

  return config;
};