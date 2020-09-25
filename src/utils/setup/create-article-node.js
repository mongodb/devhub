import { getNestedText } from '../get-nested-text';
import { getNestedValue } from '../get-nested-value';
import { updateAttributionLinks } from './update-attribution-links';

export const createArticleNode = (
    doc,
    PAGE_ID_PREFIX,
    createNode,
    createContentDigest,
    slugContentMapping
) => {
    const filename = getNestedValue(['filename'], doc) || '';
    const isArticlePage =
        !filename.includes('images/') &&
        filename.endsWith('.txt') &&
        // Remove extraneous src/index.txt file in devhub-content repo
        filename !== 'index.txt';
    const slug = doc.page_id.replace(`${PAGE_ID_PREFIX}/`, '');
    if (isArticlePage) {
        const paths = slug.split('/');
        const filenameWithoutExtension = paths[paths.length - 1];
        updateAttributionLinks(doc, filenameWithoutExtension);
        const content = {
            atfimage: doc.query_fields['atf-image'],
            authors: doc.query_fields['author'],
            description: getNestedText(doc.query_fields['meta-description']),
            languages: doc.query_fields['languages'],
            products: doc.query_fields['products'],
            pubdate: doc.query_fields['pubdate'],
            tags: doc.query_fields['tags'],
            title: getNestedText(doc.query_fields['title']),
            type: doc.query_fields['type'],
        };
        createNode({
            id: slug,
            parent: null,
            children: [],
            internal: {
                type: 'Article',
                contentDigest: createContentDigest(content),
            },
            ...content,
        });
    }
    slugContentMapping[slug] = doc;
};
