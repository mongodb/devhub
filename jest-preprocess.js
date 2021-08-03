const babelOptions = {
    presets: ['babel-preset-gatsby'],
    plugins: ['@emotion'],
};
module.exports = require('babel-jest').default.createTransformer(babelOptions);
