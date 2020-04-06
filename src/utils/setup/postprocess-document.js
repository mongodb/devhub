const { getNestedValue } = require('../get-nested-value');

/*
  Modifies in-memory content based on what type of document (image, article)
*/
const postprocessDocument = (
    nodeContent,
    slug,
    assetsArray,
    pagesArray,
    RESOLVED_REF_DOC_MAPPING
) => {
    // Add contents to in-memory slug to content mapping
    RESOLVED_REF_DOC_MAPPING[slug] = nodeContent;
    const pageNode = getNestedValue(['ast', 'children'], nodeContent);
    const filename = getNestedValue(['filename'], nodeContent) || '';
    const isArticlePage =
        !filename.includes('images/') && filename.endsWith('.txt');
    // Add any static assets to in-memory collection of assets to store
    if (pageNode) {
        assetsArray.push(...nodeContent.static_assets);
    }
    // Add any article pages to in-memory collection of pages to create
    if (isArticlePage) {
        pagesArray.push(slug);
    }
};

module.exports = { postprocessDocument };
