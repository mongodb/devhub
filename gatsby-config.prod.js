const { siteUrl } = require('./src/queries/site-url');
const { getMetadata } = require('./src/utils/get-metadata');
const { articleRssFeed } = require('./src/utils/setup/article-rss-feed');
const { searchRssFeed } = require('./src/utils/setup/search-rss-feed');

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
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: process.env.STRAPI_URL,
                contentTypes: ['projects'],
                singleTypes: [],
            },
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                // Exclude paths we are using the noindex tag on
                exclude: [
                    '/language/*',
                    '/product/*',
                    '/storybook ',
                    '/tag/*',
                    '/type/*',
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-GDFN',
                includeInDevelopment: false,
            },
        },
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: siteUrl,
                feeds: [articleRssFeed, searchRssFeed],
            },
        },
        `gatsby-plugin-meta-redirect`, // this must be last
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        siteUrl: 'https://developer.mongodb.com',
    },
};
