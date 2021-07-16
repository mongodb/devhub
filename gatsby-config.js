const { siteUrl } = require('./src/queries/site-url');
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
            options: {
                output: '/sitemap.xml',
                // Exclude paths we are using the noindex tag on
                exclude: [
                    '/language/*',
                    '/product/*',
                    '/storybook ',
                    '/tag/*',
                    '/type/*',
                ],
                // We don't want the old sitemap pointing to the new domain yet, remove this when implementing 301 redirects.
                resolveSiteUrl: () => 'https://developer.mongodb.com/',
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
        'gatsby-plugin-meta-redirect', // this must be last
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        // This value must start with `https://` or the build fails
        siteUrl: SITE_URL,
    },
};
