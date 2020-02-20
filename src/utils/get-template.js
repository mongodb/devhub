// Returns the name of the template to be used
const getTemplate = template => {
    switch (template) {
        case 'devhub-article':
            return 'article';
        default:
            return 'document';
    }
};

module.exports.getTemplate = getTemplate;
