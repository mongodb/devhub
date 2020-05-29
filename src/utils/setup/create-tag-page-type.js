import dlv from 'dlv';
import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { SNOOTY_STITCH_ID } from '../../build-constants';
import { getMetadata } from '../get-metadata';

const metadata = getMetadata();

const STITCH_TYPE_TO_URL_PREFIX = {
    author: 'author',
    languages: 'language',
    products: 'product',
    tags: 'tag',
    type: 'type',
};

const getAuthorIncludesPath = authorName => {
    switch (authorName) {
        // Handle case where REF_DOC_MAP name isnt just lastname-firstname
        case 'Ken W. Alger':
            return 'includes/authors/alger-ken';
        default:
            return `includes/authors/${authorName
                .toLowerCase()
                .split(' ')
                .reverse()
                .join('-')}`;
    }
};

export const createTagPageType = async (
    stitchType,
    createPage,
    pageMetadata,
    RESOLVED_REF_DOC_MAPPING,
    stitchClient
) => {
    const isAuthor = stitchType === 'author';
    const pageType = STITCH_TYPE_TO_URL_PREFIX[stitchType];

    // Query for all possible values for this type of tag
    const possibleTagValues = await stitchClient.callFunction(
        'getValuesByKey',
        [metadata, stitchType]
    );

    const requests = [];

    // For each possible tag value, query the pages that exist for it
    await possibleTagValues.forEach(async tag => {
        const requestKey = {};
        requestKey[stitchType] = tag._id;
        requests.push(
            stitchClient.callFunction('fetchDevhubMetadata', [
                metadata,
                requestKey,
            ])
        );
    });

    const pageData = await Promise.all(requests);

    // Once requests finish, map the item with name (and optional image) to the response's return value
    const itemsWithPageData = possibleTagValues.map((r, i) => ({
        item: r,
        pages: pageData[i],
    }));

    itemsWithPageData.forEach(page => {
        const name = isAuthor ? page.item._id.name : page.item._id;
        // Some bad data for authors doesn't follow this structure, so ignore it
        if (name) {
            const urlSuffix = getTagPageUriComponent(name);
            const newPage = {
                name,
                type: pageType,
                slug: `/${pageType}/${urlSuffix}`,
                pages: page.pages,
            };
            if (isAuthor) {
                const authorBioPath = getAuthorIncludesPath(name);
                const bio = dlv(
                    RESOLVED_REF_DOC_MAPPING[authorBioPath],
                    ['ast', 'children', 0, 'children', 0],
                    null
                );
                newPage['author_image'] = page.item._id.image;
                newPage['bio'] = bio;
            }
            createPage({
                path: newPage.slug,
                component: path.resolve(`./src/templates/tag.js`),
                context: {
                    metadata: pageMetadata,
                    snootyStitchId: SNOOTY_STITCH_ID,
                    ...newPage,
                },
            });
        }
    });
};
