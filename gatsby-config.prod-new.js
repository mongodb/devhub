const { siteUrl } = require('./src/queries/site-url');
const { getMetadata } = require('./src/utils/get-metadata');
const { articleRssFeed } = require('./src/utils/setup/article-rss-feed');
const { searchRssFeed } = require('./src/utils/setup/search-rss-feed');

require('dotenv').config({
    path: '.env.production',
});

const SITE_URL = 'https://www.mongodb.com/developer';

const metadata = getMetadata();

module.exports = {
    pathPrefix: '/developer',
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
                contentTypes: ['articles', 'client-side-redirects', 'projects'],
                singleTypes: [
                    'feedback-rating-flow',
                    'student-spotlight-featured',
                    'top-banner',
                    'top-nav',
                ],
                publicationState: process.env.STRAPI_PUBLICATION_STATE,
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
            output: '/sitemap.xml',
            options: {
                // Exclude paths we are using the noindex tag on
                exclude: [
                    '/language/*',
                    '/product/*',
                    '/storybook ',
                    '/tag/*',
                    '/type/*',
                    // The below two are current 301 redirects that should be ignored
                    '/quickstart/node-connect-mongodb/',
                    '/quickstart/node-connect-mongodb-3-3-2/',
                ],
                // This plugin uses the siteUrl AND prefix path, will still apply the prefix
                // Uncomment below when sitemap is to point to the correct domain and remove
                // the serialize command
                // resolveSiteUrl: () => 'https://www.mongodb.com/',
                serialize: ({ allSitePage }) =>
                    allSitePage.edges.map(({ node }) => ({
                        url: `https://developer.mongodb.com/${node.path.replace(
                            /^\/developer\//,
                            ''
                        )}`,
                        changefreq: `daily`,
                        priority: 0.7,
                    })),
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
