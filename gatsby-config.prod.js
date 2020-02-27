const { normalizePath } = require('./src/utils/generate-path-prefix');
const { getMetadata } = require('./src/utils/get-metadata');

require('dotenv').config({
    path: '.env.production',
});

const metadata = getMetadata();

const { project, user, parserBranch } = metadata;

const base = `${project}/${user}`;
const pathPrefix = normalizePath(`/devhub/${base}/${parserBranch}`);

module.exports = {
    pathPrefix,
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-emotion',
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-GDFN',

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,
            },
        },
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
    },
};
