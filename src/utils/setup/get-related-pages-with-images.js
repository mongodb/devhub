import dlv from 'dlv';

export const getRelatedPagesWithImages = (
    pageNodes,
    RESOLVED_REF_DOC_MAPPING
) => {
    const related = dlv(pageNodes, 'query_fields.related', []);
    const relatedPageInfo = related.map(r => {
        // Handle `reference` and `ref_role` types
        const target = r.target || r.refuri || r.fileid;
        const slug = target && target.slice(1);
        return {
            ...r,
            target,
            image: dlv(
                RESOLVED_REF_DOC_MAPPING,
                [slug, 'query_fields', 'atf-image'],
                null
            ),
        };
    });
    return relatedPageInfo;
};
