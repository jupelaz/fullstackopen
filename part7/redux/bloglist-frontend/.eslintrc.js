module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 4],
    'linebreak-style': ['error', 'win'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
