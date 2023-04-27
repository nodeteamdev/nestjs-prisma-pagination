module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'max-len': [
      'error',
      150,
    ],
    'import/no-unresolved': 'off',
    'no-bitwise': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
    ],
    'import/extensions': 'off',
    'no-empty-function': 'off',
    indent: [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        // eslint-disable-next-line max-len
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'linebreak-style': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
  },
};
