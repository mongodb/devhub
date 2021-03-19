import path from 'path';
import { buildTimeAuthors } from '../../queries/authors';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { transformAuthorStrapiData } from './transform-author-strapi-data';
import { getMetadata } from '../get-metadata';

const getAuthorListFromGraphql = async graphql => {
    const authorResp = await graphql(buildTimeAuthors);
    const result = authorResp.data.allStrapiAuthors.nodes;
    return result;
};

const getSnootyArticlesForAuthor = async (snootyAuthor, realmClient) => {
    const requestKey = { author: snootyAuthor._id };
    return await realmClient.callFunction('fetchDevhubMetadata', [
        metadata,
        requestKey,
    ]);
};

const metadata = getMetadata();

export const createStrapiAuthorPages = async (
    createPage,
    pageMetadata,
    graphql,
    realmClient
) => {
    const authors = await getAuthorListFromGraphql(graphql);
    const snootyAuthors = await realmClient.callFunction('getValuesByKey', [
        metadata,
        'author',
    ]);
    const createSingleAuthorPage = async author => {
        const transformedAuthorData = transformAuthorStrapiData(author);
        const urlSuffix = getTagPageUriComponent(transformedAuthorData.name);
        // See if this author also has some work in Snooty
        const snootyAuthor = snootyAuthors.find(
            a => a._id.name === transformedAuthorData.name
        );
        let pages = [];
        if (snootyAuthor) {
            // Get snooty pages
            pages = await getSnootyArticlesForAuthor(snootyAuthor, realmClient);
        }
        const newPage = {
            type: 'author',
            slug: `/author/${urlSuffix}`,
            pages,
            ...transformedAuthorData,
        };
        createPage({
            path: newPage.slug,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
                metadata: pageMetadata,
                isASTBio: false,
                isInternalImage: false,
                ...newPage,
            },
        });
    };
    const results = authors.map(createSingleAuthorPage);
    await Promise.all(results);
};
