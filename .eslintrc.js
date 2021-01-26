module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  },
  globals: {
    sap: 'readonly',
    jQuery: 'readonly',
    $: 'readonly',
    QUnit: 'readonly'
  }
}
