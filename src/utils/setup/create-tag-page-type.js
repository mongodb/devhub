import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { SNOOTY_STITCH_ID } from '../../build-constants';
import { SnootyTagPage } from '../../classes/snooty-tag-page';

const STITCH_TYPE_TO_URL_PREFIX = {
    author: 'author',
    languages: 'language',
    products: 'product',
    tags: 'tag',
    type: 'type',
};

export const createTagPageType = async (
    type,
    createPage,
    tagPageDirectory,
    pageMetadata
) => {
    Object.keys(tagPageDirectory[type]).forEach(name => {
        let tagPage;
        const urlSuffix = getTagPageUriComponent(name);
        const slug = `/${type}/${urlSuffix}`;
        tagPage = new SnootyTagPage(
            name,
            type,
            slug,
            tagPageDirectory[type][name]
        );
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
                metadata: pageMetadata,
                snootyStitchId: SNOOTY_STITCH_ID,
                ...tagPage,
            },
        });
    });
};
