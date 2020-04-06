const { getNestedValue } = require('../get-nested-value');

/*
  Modifies in-memory content based on what type of document (image, article)
*/
const postprocessDocument = (
    doc,
    assetsArray,
    pagesArray,
    PAGE_ID_PREFIX,
    RESOLVED_REF_DOC_MAPPING
) => {
    const { page_id, ...rest } = doc;
    const slug = page_id.replace(`${PAGE_ID_PREFIX}/`, '');
    // Add contents to in-memory slug to content mapping
    RESOLVED_REF_DOC_MAPPING[slug] = rest;
    const pageNode = getNestedValue(['ast', 'children'], rest);
    const filename = getNestedValue(['filename'], rest) || '';
    const isArticlePage =
        !filename.includes('images/') && filename.endsWith('.txt');
    // Add any static assets to in-memory collection of assets to store
    if (pageNode) {
        assetsArray.push(...rest.static_assets);
    }
    // Add any article pages to in-memory collection of pages to create
    if (isArticlePage) {
        pagesArray.push(slug);
    }
};

module.exports = { postprocessDocument };
