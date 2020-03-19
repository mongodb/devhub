const { getMetadata } = require('./src/utils/get-metadata');
const { plugins } = require('./gatsby-config');

require('dotenv').config({
    path: '.env.production',
});

const metadata = getMetadata();

module.exports = {
    pathPrefix: '',
    plugins,
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        siteUrl: 'https://developer.mongodb.com',
    },
};
