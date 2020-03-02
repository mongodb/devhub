import { getTagPageUriComponent } from './get-tag-page-uri-component';

export const mapTagTypeToUrl = (tags, tagType) => {
    // Allow tag type to be omitted in article rST
    if (!tags || !tags.length) return [];
    return tags.map(t => ({
        label: t,
        to: `/${tagType}/${getTagPageUriComponent(t)}`,
    }));
};
