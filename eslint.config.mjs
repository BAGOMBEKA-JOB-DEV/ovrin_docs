import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const nextConfig = compat.extends('next/core-web-vitals', 'next/typescript');
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'coverage/**'] },
  ...nextConfig,
  {
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default config;
