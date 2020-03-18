const { getNestedValue } = require('./src/utils/get-nested-value');
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
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    site {
                    siteMetadata {
                        title
                        siteUrl
                    }
                    }
                }
                `,
                feeds: [
                    {
                        serialize: ({ query: { site, allSitePage } }) => {
                            return allSitePage.edges.map(edge => {
                                const path = getNestedValue(
                                    ['node', 'path'],
                                    edge
                                );
                                const query_fields = getNestedValue(
                                    [
                                        'node',
                                        'context',
                                        '_xrefDocMapping',
                                        'query_fields',
                                    ],
                                    edge
                                );
                                const description =
                                    getNestedValue(
                                        [
                                            'meta_description',
                                            0,
                                            'children',
                                            0,
                                            'value',
                                        ],
                                        query_fields
                                    ) || '';
                                const title =
                                    getNestedValue(
                                        ['title', 0, 'value'],
                                        query_fields
                                    ) || '';
                                return {
                                    title: title,
                                    description: description,
                                    url: site.siteMetadata.siteUrl + path,
                                };
                            });
                        },
                        query: `
                    {
                        allSitePage(filter: {path: {regex: "/^/((article)|(how-to)|(quickstart))/"}}) {
                            edges {
                                node {
                                id
                                path
                                context {
                                    _xrefDocMapping {
                                        query_fields {
                                            meta_description {
                                                children {
                                                    value
                                                }
                                            }
                                            title {
                                                value
                                            }
                                        }
                                    }
                                }
                                }
                            }
                        }
                    }
            `,
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
