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
            canonicalUrl: article.SEO.canonical_url,
            metaDescription: article.SEO.meta_description,
            og: {
                description: article.SEO.og_description,
                image: article.SEO.og_image,
                title: article.name,
                type: article.SEO.og_type,
                url: article.SEO.og_url,
            },
            twitter: {
                creator: article.SEO.twitter_creator,
                description: article.SEO.twitter_description,
                image: article.SEO.twitter_image,
                site: article.SEO.twitter_site,
                title: article.SEO.twitter_title,
            },
        },
        slug: `/${typeMap[article.type]}${article.slug}`,
        tags: article.tags.map(t => t.tag),
        type: typeMap[article.type],
    };
};
