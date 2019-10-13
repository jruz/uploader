module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: true,
      typescript: {},
    },
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
  ],
  globals: {
    browser: true,
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'import/prefer-default-export': 'off',
    'linebreak-style': 'error',
    'max-len': ['error', { code: 80, ignoreStrings: true, ignoreUrls: true }],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-console': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-unused-vars': ['error'],
    'no-useless-constructor': 'off',
    'jest/no-disabled-tests': 'error',
  },
  plugins: ['@typescript-eslint', 'jest'],
};
