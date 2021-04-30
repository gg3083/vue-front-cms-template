module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        tabWidth: 4,
        useTabs: false,
        trailingComma: 'es5',
        arrowParens: 'always',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
