import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { SNOOTY_STITCH_ID } from '../../build-constants';
import { SnootyTagPage } from '../../classes/snooty-tag-page';
import { SnootyAuthorPage } from '../../classes/snooty-author-page';

export const createTagPageType = async (
    type,
    createPage,
    tagPageDirectory,
    pageMetadata
) => {
    Object.keys(tagPageDirectory[type]).forEach(name => {
        const isAuthor = type === 'author';
        let tagPage;
        const urlSuffix = getTagPageUriComponent(name);
        const slug = `/${type}/${urlSuffix}`;
        if (isAuthor) {
            console.log(tagPageDirectory[type][name]['author']);
            tagPage = new SnootyAuthorPage(
                tagPageDirectory[type][name]['author'],
                slug,
                tagPageDirectory[type][name]['pages']
            );
            console.log(tagPage);
        } else {
            tagPage = new SnootyTagPage(
                name,
                type,
                slug,
                tagPageDirectory[type][name]
            );
        }
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
