import { mapTagTypeToUrl } from './map-tag-type-to-url';

export const getTagLinksFromMeta = meta => {
    console.log('salmon', meta);
    const mappedTags = mapTagTypeToUrl(meta.tags, 'tag');
    const mappedLanguageTags = mapTagTypeToUrl(meta.languages, 'language');
    const mappedProductTags = mapTagTypeToUrl(meta.products, 'product');
    const allTags = [
        ...mappedTags,
        ...mappedLanguageTags,
        ...mappedProductTags,
    ];
    return allTags;
};
