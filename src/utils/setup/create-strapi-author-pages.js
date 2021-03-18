import path from 'path';
import { buildTimeAuthors } from '../../queries/authors';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';

const getAuthorListFromGraphql = async graphql => {
    const authorResp = await graphql(buildTimeAuthors);
    const result = authorResp.data.allStrapiAuthors.nodes;
    return result;
};

export const createStrapiAuthorPages = async (
    createPage,
    pageMetadata,
    graphql
) => {
    const authors = await getAuthorListFromGraphql(graphql);
    const createSingleAuthorPage = author => {
        // Some bad data for authors doesn't follow this structure, so ignore it
        const urlSuffix = getTagPageUriComponent(author.Name);
        const newPage = {
            type: 'author',
            slug: `/author/${urlSuffix}`,
            pages: [],
            name: author.Name,
            bio: author.Bio,
            location: author.Location,
            image: author.Image,
            title: author.Title,
        };
        createPage({
            path: newPage.slug,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
                metadata: pageMetadata,
                ...newPage,
            },
        });
    };

    authors.forEach(createSingleAuthorPage);
};
