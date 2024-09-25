import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
    pluginJs.configs.recommended,
    {
        files: ['**/*.js'],
        ignores: ['**/node_modules/**', './dist/**', 'webpack.config.js'],
        languageOptions: {
            globals: {
                ...globals.browser
            },
            sourceType: 'module'
        },
        rules: {
            'no-console': 'off',
            'no-var': 'error'
        }
    },
    prettier
];
