const { getNestedValue } = require('../get-nested-value');

/*
  Modifies in-memory content based on what type of document (image, article)
*/
const postprocessDocument = (
    doc,
    PAGE_ID_PREFIX,
    pagesArray,
    RESOLVED_REF_DOC_MAPPING
) => {
    const { page_id, ...nodeContent } = doc;
    const slug = page_id.replace(`${PAGE_ID_PREFIX}/`, '');
    // Add contents to in-memory slug to content mapping
    RESOLVED_REF_DOC_MAPPING[slug] = nodeContent;
    const filename = getNestedValue(['filename'], nodeContent) || '';
    const isArticlePage =
        !filename.includes('images/') && filename.endsWith('.txt');
    // Add any article pages to in-memory collection of pages to create
    if (isArticlePage) {
        pagesArray.push(slug);
    }
};

module.exports = { postprocessDocument };
