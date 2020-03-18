import dlv from 'dlv';

export const getFeaturedCardFields = article => {
    if (!article) {
        return {
            image: null,
            slug: null,
            title: null,
            description: null,
            tags: null,
        };
    }
    const query_fields = article.query_fields;
    const image = query_fields['atf-image'];
    const slug = query_fields.slug;
    const title = dlv(query_fields, ['title', 0, 'value']);
    const description = dlv(query_fields, [
        'meta-description',
        0,
        'children',
        0,
        'value',
    ]);
    const tags = {
        products: query_fields.products,
        tags: query_fields.tags,
        languages: query_fields.languages,
    };
    return { image, slug, title, description, tags };
};
