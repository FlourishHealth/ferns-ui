const { FlatCompat } = require('@eslint/eslintrc');
const ban = require('eslint-plugin-ban')
const parser = require('@typescript-eslint/parser')

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
    ...compat.extends('plugin:ferns/recommended'),
    ...compat.extends('plugin:react-native-a11y/all'),
   {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
    },
    plugins: {
      ban,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'ban/ban': [
        'error',
        {
          name: ['dayjs', '*'],
          message: 'Use Luxon.',
        },
        {
          name: ['moment', '*'],
          message: 'Use Luxon',
        },
      ],
    },
  },
];