/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {
  const pack = require('./package.json');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  const production = !!(env && env.production === 'true');
  const asmodule = !!(env && env.module === 'true');
  const standalone = !!(env && env.standalone === 'true');

  const babelSettings = {
    extends: path.join(__dirname, '/.babelrc'),
  };

  const config = {
    mode: production ? 'production' : 'development',
    entry: {
      myapp: './client/myapp.js',
    },
    output: {
      path: path.join(__dirname, 'public', 'codebase'),
      publicPath: '/codebase/',
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader?' + JSON.stringify(babelSettings),
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: 'url-loader?limit=25000',
        },
        {
          test: /\.(less|css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
      ],
    },
    stats: 'minimal',
    resolve: {
      extensions: ['.js'],
      modules: ['./client', 'node_modules'],
      alias: {
        'jet-views': path.resolve(__dirname, 'client/views'),
        'jet-locales': path.resolve(__dirname, 'client/locales'),
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        VERSION: `"${pack.version}"`,
        APPNAME: `"${pack.name}"`,
        PRODUCTION: production,
        BUILD_AS_MODULE: asmodule || standalone,
      }),
    ],
    devServer: {
      stats: 'errors-only',
      contentBase: './public/',
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };

  if (!production) {
    config.devtool = 'inline-source-map';
  }

  if (asmodule) {
    if (!standalone) {
      config.externals = config.externals || {};
      config.externals = ['webix-jet'];
    }

    const out = config.output;
    const sub = standalone ? 'full' : 'module';

    out.library = pack.name.replace(/[^a-z0-9]/gi, '');
    out.libraryTarget = 'umd';
    out.path = path.join(__dirname, 'dist', sub);
    out.publicPath = '/dist/' + sub + '/';
  }

  return config;
};
