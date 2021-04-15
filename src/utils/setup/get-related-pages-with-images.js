import dlv from 'dlv';

export const getRelatedPagesWithImages = async (
    pageNodes,
    RESOLVED_REF_DOC_MAPPING,
    associations,
    ttrFunction
) => {
    const relatedPageInfo = await Promise.all(
        associations.map(async target => {
            // Handle `reference` and `ref_role` types
            // const getTargetFromFileid = dlv(r, 'fileid.0', null);
            // const target = r.refuri || getTargetFromFileid;
            const slug = target && target.slice(1, -1);
            const timeToRead = dlv(
                await ttrFunction(slug),
                ['data', 'article', 'timeToRead'],
                null
            );
            return {
                target,
                image: dlv(
                    RESOLVED_REF_DOC_MAPPING,
                    [slug, 'query_fields', 'atf-image'],
                    null
                ),
                timeToRead,
            };
        })
    );
    return relatedPageInfo;
};
