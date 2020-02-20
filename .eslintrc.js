// const ERROR = 'error';
// const OFF = 'off';
const WARN = 'warn';

module.exports = {
    globals: {
        __PATH_PREFIX__: true,
        browser: true,
    },
    extends: ['react-app', 'plugin:import/errors'],
    plugins: ['emotion', 'jest'],
    rules: {
        'emotion/syntax-preference': [WARN, 'string'],
        eqeqeq: [WARN, 'always', { null: 'ignore' }],
        'import/no-extraneous-dependencies': [
            'warn',
            { devDependencies: true },
        ],
        'no-unused-vars': [
            WARN,
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', '.'],
            },
        },
    },
};
