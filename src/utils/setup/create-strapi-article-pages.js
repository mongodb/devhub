import { buildTimeArticles } from '../../queries/articles';
import { StrapiArticle } from '../../classes/strapi-article';

export const getStrapiArticleListFromGraphql = async graphql => {
    const projectResp = await graphql(buildTimeArticles);
    const result = projectResp.data.allStrapiArticles.nodes.map(
        article => new StrapiArticle(article)
    );
    return result;
};
