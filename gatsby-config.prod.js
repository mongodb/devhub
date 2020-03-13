const { getMetadata } = require('./src/utils/get-metadata');

require('dotenv').config({
    path: '.env.production',
});

const metadata = getMetadata();

module.exports = {
    pathPrefix: '',
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
        siteUrl: 'https://developer.mongodb.com',
    },
};
