module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
  ],
};
