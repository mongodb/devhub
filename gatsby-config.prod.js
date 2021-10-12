const { siteUrl } = require('./src/queries/site-url');
const {
    mapPublicationStateToArray,
} = require('./src/utils/setup/map-publication-state-to-array');
const { getMetadata } = require('./src/utils/get-metadata');
const { articleRssFeed } = require('./src/utils/setup/article-rss-feed');
const { searchRssFeed } = require('./src/utils/setup/search-rss-feed');

require('dotenv').config({
    path: '.env.production',
});

const metadata = getMetadata();

const SITE_URL = 'https://www.mongodb.com/developer';

module.exports = {
    pathPrefix: '',
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-emotion',
        'gatsby-plugin-force-trailing-slashes',
        {
            resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
            options: {
                disable: true,
            },
        },
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: process.env.STRAPI_URL,
                collectionTypes: mapPublicationStateToArray([
                    'articles',
                    'article-series',
                    'client-side-redirects',
                    'community-champions',
                    'projects',
                ]),
                queryLimit: 0,
                singleTypes: mapPublicationStateToArray([
                    'feedback-rating-flow',
                    'student-spotlight-featured',
                    'top-banner',
                    'top-nav',
                ]),
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    '~src': 'src',
                    '~components': 'src/components',
                    '~hooks': 'src/hooks',
                    '~images': 'src/images',
                    '~pages': 'src/pages',
                    '~utils': 'src/utils',
                    '~tests': 'tests',
                },
                extensions: ['js'],
            },
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                output: '/sitemap',
                // Exclude paths we are using the noindex tag on
                excludes: [
                    '/language/*',
                    '/product/*',
                    '/storybook ',
                    '/tag/*',
                    '/type/*',
                    // The below two are current 301 redirects that should be ignored
                    '/quickstart/node-connect-mongodb/',
                    '/quickstart/node-connect-mongodb-3-3-2/',
                    // There are several URLs which canonicalize elsewhere
                    // For now, just enumerate them but we should implement a more proper fix
                    '/quickstart/node-aggregation-framework-3-3-2/',
                    '/quickstart/node-crud-tutorial-3-3-2/',
                    '/quickstart/node-transactions-3-3-2/',
                    '/quickstart/nodejs-change-streams-triggers/',
                    '/quickstart/nodejs-change-streams-triggers-3-3-2/',
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
                feeds: [articleRssFeed(SITE_URL), searchRssFeed(SITE_URL)],
            },
        },
        `gatsby-plugin-meta-redirect`, // this must be last
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        siteUrl: SITE_URL,
    },
};
