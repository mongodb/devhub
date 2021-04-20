require = require('esm')(module);
require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2017',
    },
});
module.exports = require('./gatsby-node.esm.js');
