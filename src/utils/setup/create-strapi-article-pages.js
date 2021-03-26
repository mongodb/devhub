import path from 'path';
import { transformArticleStrapiData } from '../transform-article-strapi-data';
import { buildTimeArticles } from '../../queries/articles';
import { parseMarkdownToAST } from './parse-markdown-to-ast';

const createPageForStrapiArticle = async (article, createPage, metadata) => {
    const { content, slug, ...rest } = article;
    const parsedContent = await parseMarkdownToAST(content);
    const template = 'strapi-article';
    if (parsedContent && Object.keys(parsedContent).length > 0) {
        // TODO: Add related fields
        // TODO: Add series
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
                metadata,
                parsedContent,
                slug,
                ...rest,
            },
        });
    }
};

export const getStrapiArticleListFromGraphql = async graphql => {
    const projectResp = await graphql(buildTimeArticles);
    const result = projectResp.data.allStrapiArticles.nodes.map(
        transformArticleStrapiData
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
