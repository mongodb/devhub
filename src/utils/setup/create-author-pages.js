import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { SNOOTY_STITCH_ID } from '../../build-constants';
import { getMetadata } from '../get-metadata';
import { SnootyAuthor } from '../../classes/snooty-author';
import { StrapiAuthor } from '../../classes/strapi-author';
import { SnootyAuthorPage } from '../../classes/snooty-author-page';

const metadata = getMetadata();

const STITCH_TYPE_TO_URL_PREFIX = {
    author: 'author',
    languages: 'language',
    products: 'product',
    tags: 'tag',
    type: 'type',
};

export const createAuthorPages = async (
    stitchType,
    createPage,
    pageMetadata,
    RESOLVED_REF_DOC_MAPPING,
    stitchClient,
    strapiAuthors,
    allArticles
) => {
    const pageType = STITCH_TYPE_TO_URL_PREFIX[stitchType];

    // Query for all possible values for this type of tag
    let allValues = await stitchClient.callFunction('getValuesByKey', [
        metadata,
        stitchType,
    ]);

    allValues = allValues.map(
        a => new SnootyAuthor(a._id, RESOLVED_REF_DOC_MAPPING)
    );

    // Update any with Strapi author info
    strapiAuthors.forEach(({ name, bio, image, location, title }) => {
        const snootyAuthor = allValues.find(
            ({ name: authorName }) => authorName === name
        );
        if (snootyAuthor) {
            allValues.push(
                new StrapiAuthor(
                    { ...snootyAuthor, name, bio, image, location, title },
                    RESOLVED_REF_DOC_MAPPING
                )
            );
        }
    });

    const pageData = [];

    // For each possible tag value, query the pages that exist for it
    allValues.forEach(async author => {
        pageData.push(
            allArticles.filter(
                a =>
                    !!a.authors &&
                    a.authors.find(({ name }) => name === author.name)
            )
        );
    });

    // Once requests finish, map the item with name (and optional image) to the response's return value
    const itemsWithPageData = allValues.map((r, i) => ({
        author: r,
        pages: pageData[i],
    }));

    itemsWithPageData.forEach(({ author, pages }) => {
        const name = author.name;
        // Some bad data for authors doesn't follow this structure, so ignore it
        if (name) {
            const urlSuffix = getTagPageUriComponent(name);
            const slug = `/${pageType}/${urlSuffix}`;
            const tagPage = new SnootyAuthorPage(author, slug, pages);
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
};
