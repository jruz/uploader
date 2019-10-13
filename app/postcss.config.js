const Autoprefixer = require('autoprefixer');
const Import = require('postcss-import');

module.exports = {
  plugins: [new Autoprefixer(), new Import()],
};
