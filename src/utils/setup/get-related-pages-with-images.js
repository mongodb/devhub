import dlv from 'dlv';

export const getRelatedPagesWithImages = (
    related,
    pageNodes,
    RESOLVED_REF_DOC_MAPPING
) => {
    const relatedPageInfo = related.map(r => {
        // Handle `reference` and `ref_role` types
        const getTargetFromFileid = dlv(r, 'fileid.0', null);
        const target = r.refuri || getTargetFromFileid;
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
