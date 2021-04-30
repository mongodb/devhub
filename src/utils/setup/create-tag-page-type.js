import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { SNOOTY_STITCH_ID } from '../../build-constants';
import { getMetadata } from '../get-metadata';
import { SnootyAuthorPage } from '../../classes/snooty-author-page';
import { SnootyTagPage } from '../../classes/snooty-tag-page';

const metadata = getMetadata();

const STITCH_TYPE_TO_URL_PREFIX = {
    author: 'author',
    languages: 'language',
    products: 'product',
    tags: 'tag',
    type: 'type',
};

export const createTagPageType = async (
    stitchType,
    createPage,
    pageMetadata,
    RESOLVED_REF_DOC_MAPPING,
    stitchClient,
    strapiAuthors,
    allArticles
) => {
    const isAuthor = stitchType === 'author';
    const pageType = STITCH_TYPE_TO_URL_PREFIX[stitchType];

    // Query for all possible values for this type of tag
    const possibleTagValues = await stitchClient.callFunction(
        'getValuesByKey',
        [metadata, stitchType]
    );

    if (isAuthor) {
        // Update any with Strapi author info
        strapiAuthors.forEach(({ name, bio, image, location, title }) => {
            const snootyAuthor = possibleTagValues.find(
                ({ _id }) => _id.name === name
            );
            // TODO: Use an Author/Tag Type Class to abstract
            if (snootyAuthor) {
                snootyAuthor._id = {
                    ...snootyAuthor._id,
                    bio,
                    image: image ? image.url : snootyAuthor._id.image,
                    location,
                    title,
                };
            } else {
                possibleTagValues.push({
                    _id: {
                        bio,
                        name,
                        image: image && image.url,
                        location,
                        title,
                    },
                });
            }
        });
    }

    let pageData = [];

    // For each possible tag value, query the pages that exist for it
    await possibleTagValues.forEach(async tag => {
        let target;
        switch (stitchType) {
            case 'author':
                target = tag._id.name;
                pageData.push(
                    allArticles.filter(
                        a =>
                            !!a.authors &&
                            a.authors.find(({ name }) => name === target)
                    )
                );
                break;
            case 'type':
                target = tag._id;
                pageData.push(
                    allArticles.filter(a => !!a.type && a.type === target)
                );
                break;

            default:
                target = tag._id;
                pageData.push(
                    allArticles.filter(
                        a =>
                            !!a[stitchType] &&
                            a[stitchType].find(({ label }) => label === target)
                    )
                );
                break;
        }
    });

    // Once requests finish, map the item with name (and optional image) to the response's return value
    const itemsWithPageData = possibleTagValues.map((r, i) => ({
        item: r,
        pages: pageData[i],
    }));

    itemsWithPageData.forEach(page => {
        const name = isAuthor ? page.item._id.name : page.item._id;
        // Some bad data for authors doesn't follow this structure, so ignore it
        if (name) {
            let tagPage;
            const urlSuffix = getTagPageUriComponent(name);
            const slug = `/${pageType}/${urlSuffix}`;
            if (isAuthor) {
                tagPage = new SnootyAuthorPage(
                    page,
                    RESOLVED_REF_DOC_MAPPING,
                    slug,
                    page.pages
                );
            } else {
                tagPage = new SnootyTagPage(name, pageType, slug, page.pages);
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
        }
    });
    // Now also do Strapi authors
};
