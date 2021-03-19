import { buildTimeAuthors } from '../../queries/authors';

export const getAuthorListFromGraphql = async graphql => {
    const authorResp = await graphql(buildTimeAuthors);
    const result = authorResp.data.allStrapiAuthors.nodes;
    return result;
};
