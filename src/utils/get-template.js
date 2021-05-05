// Returns the name of the template to be used
const getTemplate = template => {
    switch (template) {
        case 'devhub-article':
            return 'article';
        default:
            throw new Error(
                `The given article template was not devhub-article or strapi-article, it was ${template}. This means there was likely a parsing issue.`
            );
    }
};

module.exports.getTemplate = getTemplate;
