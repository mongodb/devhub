import { transformArticleStrapiData } from '../transform-article-strapi-data';
import { buildTimeArticles } from '../../queries/articles';
import { parseMarkdownToAST } from './parse-markdown-to-ast';

const createPageForStrapiArticle = async (article, callback) => {
    const updatedArticle = transformArticleStrapiData(article);
    const { contents, slug } = updatedArticle;
    const parsedContent = await parseMarkdownToAST(contents);
    callback(slug, parsedContent);
};

const getStrapiArticleListFromGraphql = async graphql => {
    const projectResp = await graphql(buildTimeArticles);
    const result = projectResp.data.allStrapiArticles.nodes;
    return result;
};

export const createStrapiArticlePages = async (graphql, callback) => {
    const articleList = await getStrapiArticleListFromGraphql(graphql);
    articleList.forEach(
        async article => await createPageForStrapiArticle(article, callback)
    );
};
