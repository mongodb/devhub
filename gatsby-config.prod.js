const { rssFeedArticleData } = require('./src/queries/rss-feed-article-data');
const { siteUrl } = require('./src/queries/site-url');
const { serializeRssData } = require('./src/utils/setup/serialize-rss-data');
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
        siteUrl: 'https://developer.mongodb.com',
    },
};
