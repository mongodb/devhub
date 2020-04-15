const { rssFeedArticleData } = require('./src/queries/rss-feed-article-data');
const { siteUrl } = require('./src/queries/site-url');
const { serializeRssData } = require('./src/utils/setup/serialize-rss-data');
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
                feeds: [
                    {
                        serialize: serializeRssData,
                        query: rssFeedArticleData,
                        output: '/rss.xml',
                        title: 'MongoDB Developer Hub RSS Feed',
                    },
                ],
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
