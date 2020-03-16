const { generatePathPrefix } = require('./src/utils/generate-path-prefix');
const { getMetadata } = require('./src/utils/get-metadata');

const runningEnv = process.env.NODE_ENV || 'production';

require('dotenv').config({
    path: `.env.${runningEnv}`,
});

const metadata = getMetadata();

module.exports = {
    pathPrefix: generatePathPrefix(metadata),
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-emotion',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-GDFN',
                // Exclude paths we are using the noindex tag on
                exclude: ['/language/*', '/product/*', '/tag/*'],

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,
            },
        },
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        // This value must start with `https://` or the build fails
        siteUrl: 'https://developer.mongodb.com',
    },
};
