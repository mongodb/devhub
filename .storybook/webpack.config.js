const path = require('path');

module.exports = ({ config }) => {
    const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader');

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
        require.resolve('@babel/preset-react'),
        require.resolve('@babel/preset-env'),
        require.resolve('@emotion/babel-preset-css-prop'),
    ];

    config.module.rules[0].use[0].options.plugins = [
        // use @babel/plugin-proposal-class-properties for class arrow functions
        require.resolve('@babel/plugin-proposal-class-properties'),
        // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
        require.resolve('babel-plugin-remove-graphql-queries'),
    ];

    config.resolve = {
        // Alias preview for Image component loading
        alias: {
            previewSetup: path.resolve(__dirname, '../preview/noop.js'),
        },
        // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
        mainFields: ['browser', 'module', 'main'],
    };

    config.module.rules.push({
        test: /\.(stories|story)\.mdx$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    plugins: ['@babel/plugin-transform-react-jsx'],
                },
            },
            {
                loader: '@mdx-js/loader',
                options: {
                    compilers: [createCompiler({})],
                },
            },
        ],
    });

    return config;
};
