/*
  Modifies in-memory content based on what type of document (image, article)
*/
const postprocessDocument = (doc, PAGE_ID_PREFIX, RESOLVED_REF_DOC_MAPPING) => {
    const { page_id, ...nodeContent } = doc;
    const slug = page_id.replace(`${PAGE_ID_PREFIX}/`, '');
    // Add contents to in-memory slug to content mapping
    RESOLVED_REF_DOC_MAPPING[slug] = nodeContent;
};

module.exports = { postprocessDocument };
