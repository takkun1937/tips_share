// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSecurity from 'eslint-plugin-security';
import pluginQuery from '@tanstack/eslint-plugin-query';
import checkFile from 'eslint-plugin-check-file';
import playwright from 'eslint-plugin-playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...pluginQuery.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  pluginSecurity.configs.recommended,
  playwright.configs['flat/recommended'],
  {
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {},
      },
    },
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/discussions should not import from src/features/comments, etc.

            // enforce unidirectional codebase:

            // e.g. src/app can import from src/features but not the other way around
            {
              target: './features',
              from: './app',
            },

            // e.g src/features and src/app can import from these shared modules but not the other way around
            {
              target: ['./components', './lib'],
              from: ['./features', './app'],
            },
          ],
        },
      ],
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '!(app)/**/*': 'KEBAB_CASE',
          '!(**/__tests__)/**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
