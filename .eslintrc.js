module.exports = {
  root: true,
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  globals: {
    page: true,
    browser: true,
    expectPage: true,
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
  },
}
