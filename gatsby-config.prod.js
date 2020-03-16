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
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                // Exclude paths we are using the noindex tag on
                exclude: ['/language/*', '/product/*', '/tag/*', '/type/*'],
            },
        },
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-GDFN',
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
