const { siteUrl } = require('./src/queries/site-url');
const {
    mapPublicationStateToArray,
} = require('./src/utils/setup/map-publication-state-to-array');
const { generatePathPrefix } = require('./src/utils/generate-path-prefix');
const { getMetadata } = require('./src/utils/get-metadata');
const { articleRssFeed } = require('./src/utils/setup/article-rss-feed');
const { searchRssFeed } = require('./src/utils/setup/search-rss-feed');

const runningEnv = process.env.NODE_ENV || 'production';

require('dotenv').config({
    path: `.env.${runningEnv}`,
});

const metadata = getMetadata();

const SITE_URL = 'https://www.mongodb.com/developer';

module.exports = {
    pathPrefix: generatePathPrefix(metadata),
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
                // We don't want the old sitemap pointing to the new domain yet, remove this when implementing 301 redirects.
                resolveSiteUrl: () => 'https://developer.mongodb.com/',
            },
        },
        process.env.DISABLE_GTM
            ? null
            : {
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
        'gatsby-plugin-meta-redirect', // this must be last
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        // This value must start with `https://` or the build fails
        siteUrl: SITE_URL,
    },
};
