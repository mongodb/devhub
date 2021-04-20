import { transformAuthorStrapiData } from './setup/transform-author-strapi-data';
import { parseMarkdownToAST } from './setup/parse-markdown-to-ast';

const typeMap = {
    Article: 'article',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

// This will get more complicated as we build the pipeline out
export const transformArticleStrapiData = article => {
    const authors = [article.authors];
    const transformedAuthors = authors.map(transformAuthorStrapiData);
    const parsedContent = parseMarkdownToAST(article.content);
    return {
        ...article,
        authors: transformedAuthors,
        contentAST: parsedContent,
        image: article.image.url,
        isFromStrapi: true,
        languages: article.languages.map(l => l.language),
        products: article.products.map(p => p.product),
        SEO: {
            ...article.SEO,
            twitterNode: {
                options: {
                    creator: article.SEO.twitter_creator,
                    description: article.SEO.twitter_description,
                    image: article.SEO.twitter_image.url,
                },
            },
        },
        slug: `/${typeMap[article.type]}${article.slug}`,
        tags: article.tags.map(t => t.tag),
        type: typeMap[article.type],
    };
};
