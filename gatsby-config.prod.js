const { siteUrl } = require('./src/queries/site-url');
const { getMetadata } = require('./src/utils/get-metadata');
const { articleRssFeed } = require('./src/utils/setup/article-rss-feed');
const {
    DOCUMENTS_COLLECTION,
    SNOOTY_STITCH_ID,
} = require('./src/build-constants');
const { constructDbFilter } = require('./src/utils/setup/construct-db-filter');

require('dotenv').config({
    path: '.env.production',
});

const metadata = getMetadata();
const PAGE_ID_PREFIX = `${metadata.project}/${metadata.user}/${metadata.parserBranch}`;

module.exports = {
    pathPrefix: '',
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-emotion',
        {
            resolve: 'gatsby-source-mongodb-stitch',
            options: {
                stitchId: SNOOTY_STITCH_ID,
                functions: [
                    {
                        name: 'fetchDocuments',
                        args: [
                            metadata.database,
                            DOCUMENTS_COLLECTION,
                            constructDbFilter(PAGE_ID_PREFIX),
                        ],
                        resultType: 'StitchArticle',
                    },
                ],
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
                feeds: [articleRssFeed],
            },
        },
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        siteUrl: 'https://developer.mongodb.com',
    },
};
