import dlv from 'dlv';
import { buildTimeArticles } from '../../queries/articles';
import { StrapiArticle } from '../../classes/strapi-article';

export const getStrapiArticleListFromGraphql = async graphql => {
    const projectResp = await graphql(buildTimeArticles);
    const nodes = dlv(projectResp, 'data.allStrapiArticles.nodes', []) || [];
    const result = nodes.map(article => new StrapiArticle(article));
    return result;
};
