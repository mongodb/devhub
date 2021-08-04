// For use with gatsby-source-strapi
// Attaches the publication state to the entry for API querying
// See https://github.com/strapi/gatsby-source-strapi
const mapPublicationStateToArray = arr =>
    arr.map(name => ({
        name,
        api: {
            qs: {
                _publicationState:
                    process.env.STRAPI_PUBLICATION_STATE || 'live',
            },
        },
    }));

module.exports = { mapPublicationStateToArray };
