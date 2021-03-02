import { getNestedValue } from './get-nested-value';
import { withPrefix } from 'gatsby';

const generateTrackingParam = page => `?tck=feat${page}`;

export const getFeaturedCardFields = (article, page) => {
    if (!article || !article.query_fields) {
        return {
            image: null,
            slug: null,
            title: null,
            description: null,
            tags: null,
        };
    }
    const query_fields = article.query_fields;
    return {
        image: withPrefix(query_fields['atf-image']),
        slug: query_fields['slug'] + generateTrackingParam(page),
        title: getNestedValue(['title', 0, 'value'], query_fields) || '',
        description: getNestedValue(
            ['meta-description', 0, 'children', 0, 'value'],
            query_fields
        ),
        tags: {
            products: query_fields.products,
            tags: query_fields.tags,
            languages: query_fields.languages,
        },
    };
};
