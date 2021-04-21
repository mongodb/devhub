import path from 'path';
import { buildTimeArticles } from '../../queries/articles';
import { StrapiArticle } from '../../classes/strapi-article';

const createPageForStrapiArticle = async (article, createPage, metadata) => {
    const { contentAST, slug } = article;
    if (contentAST && Object.keys(contentAST).length > 0) {
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/article.js`),
            context: {
                article,
                metadata,
            },
        });
    }
};

export const getStrapiArticleListFromGraphql = async graphql => {
    const projectResp = await graphql(buildTimeArticles);
    const result = projectResp.data.allStrapiArticles.nodes.map(
        article => new StrapiArticle(article)
    );
    return result;
};

export const createStrapiArticlePages = async (
    graphql,
    createPage,
    metadata
) => {
    const articleList = await getStrapiArticleListFromGraphql(graphql);
    articleList.forEach(
        async article =>
            await createPageForStrapiArticle(article, createPage, metadata)
    );
};
