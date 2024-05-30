const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['c']: path.resolve(__dirname, 'src/components'),
    ['p']: path.resolve(__dirname, 'src/pages')
  })
);