export const getTagLinksFromMeta = meta => {
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

const mapTagTypeToUrl = (tags, tagType) => {
    // Allow tag type to be omitted in article rST
    if (!tags || !tags.length) return [];
    return tags.map(t => ({
        label: t,
        to: `/${tagType}/${t}`,
    }));
};
