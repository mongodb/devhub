const dlv = require('dlv');
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
                                const path = dlv(edge, 'node.path');
                                const query_fields = dlv(
                                    edge,
                                    'node.context._xrefDocMapping.query_fields'
                                );
                                const description = dlv(
                                    query_fields,
                                    [
                                        'meta_description',
                                        0,
                                        'children',
                                        0,
                                        'value',
                                    ],
                                    'No description available'
                                );
                                const title = dlv(
                                    query_fields,
                                    ['title', 0, 'value'],
                                    'No title available'
                                );
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
