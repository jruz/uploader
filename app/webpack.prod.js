const CompressionPlugin = require('compression-webpack-plugin');
const Shared = require('./webpack.shared.js');

const Config = {
  mode: 'production',
  module: {
    ...Shared.module,
    rules: [
      ...Shared.module.rules,
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    ...Shared.plugins,
    new CompressionPlugin({
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};

module.exports = { ...Shared, ...Config };
