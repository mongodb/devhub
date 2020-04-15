const { getNestedText } = require('../get-nested-text');
const { getNestedValue } = require('../get-nested-value');

const createArticleNode = (
    doc,
    PAGE_ID_PREFIX,
    createNode,
    createContentDigest,
    slugContentMapping
) => {
    const filename = getNestedValue(['filename'], doc) || '';
    const isArticlePage =
        !filename.includes('images/') && filename.endsWith('.txt');
    const slug = doc.page_id.replace(`${PAGE_ID_PREFIX}/`, '');
    slugContentMapping[slug] = doc;
    if (isArticlePage) {
        const content = {
            title: getNestedText(doc.query_fields['title']),
            description: getNestedText(doc.query_fields['meta-description']),
            pubdate: doc.query_fields['pubdate'],
        };
        createNode({
            id: slug,
            parent: null,
            children: [],
            internal: {
                type: 'Article',
                contentDigest: createContentDigest(content),
            },
            ...content,
        });
    }
};

module.exports = { createArticleNode };
