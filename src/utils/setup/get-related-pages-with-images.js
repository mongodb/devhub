const dlv = require('dlv');

const getRelatedPagesWithImages = (pageNodes, RESOLVED_REF_DOC_MAPPING) => {
    const related = dlv(pageNodes, 'query_fields.related', []);
    const relatedPageInfo = related.map(r => ({
        image: dlv(
            RESOLVED_REF_DOC_MAPPING,
            [r.target, 'query_fields', 'atf-image'],
            null
        ),
        ...r,
    }));
    return relatedPageInfo;
};

module.exports = { getRelatedPagesWithImages };
