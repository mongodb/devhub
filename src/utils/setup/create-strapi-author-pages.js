import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { transformAuthorStrapiData } from './transform-author-strapi-data';
import { getMetadata } from '../get-metadata';

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
    realmClient,
    authors,
    strapiArticles
) => {
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
        let pages = strapiArticles.filter(
            a =>
                !!a.authors.find(
                    author => author.name === transformedAuthorData.name
                )
        );
        if (snootyAuthor) {
            // Get snooty pages
            pages.push(
                ...(await getSnootyArticlesForAuthor(snootyAuthor, realmClient))
            );
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
