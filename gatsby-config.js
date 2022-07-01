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
        '@wardpeet/gatsby-plugin-static-site',
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
                    'excluded-learn-page-articles',
                    'feedback-rating-flow',
                    'home-page-featured-articles',
                    'learn-page-featured-articles',
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
                    '/storybook ',
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
        // We want to omit GTM for testing purposes (not on any production builds)
        // This process of using the spread operator lets us simply add nothing to the
        // plugins array if we don't want to use this plugin
        ...(process.env.DISABLE_GTM
            ? []
            : [
                  {
                      resolve: 'gatsby-plugin-google-tagmanager',
                      options: {
                          id: 'GTM-GDFN',
                          includeInDevelopment: false,
                      },
                  },
              ]),
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
