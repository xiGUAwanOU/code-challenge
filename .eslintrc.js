module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'dot-notation': 'off',
    'linebreak-style': [ 'error', 'unix' ],
    'max-len': [ 'error', 120 ],
    'no-trailing-spaces': [ 'error' ],
    'semi': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', {
      'anonymous': 'always',
      'asyncArrow': 'always',
      'named': 'never',
    } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'quote-props': [ 'error', 'consistent' ],
    'quotes': [ 'error', 'single' ],

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
