import { transformAuthorStrapiData } from './setup/transform-author-strapi-data';
import { parseMarkdownToAST } from './setup/parse-markdown-to-ast';

const typeMap = {
    Article: 'article',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

// This will get more complicated as we build the pipeline out
export const transformArticleStrapiData = article => {
    const inferredType = article.type || 'Article';
    const authors = article.authors;
    const transformedAuthors = authors.map(transformAuthorStrapiData);
    const parsedContent = parseMarkdownToAST(article.content);
    const SEOObject = article.SEO || {};
    return {
        ...article,
        authors: transformedAuthors,
        contentAST: parsedContent,
        image: article.image ? article.image.url : null,
        isFromStrapi: true,
        languages: article.languages.map(l => l.language),
        products: article.products.map(p => p.product),
        SEO: {
            canonicalUrl: SEOObject.canonical_url,
            metaDescription: SEOObject.meta_description,
            og: {
                description: SEOObject.og_description,
                image: SEOObject.og_image,
                title: article.name,
                type: SEOObject.og_type,
                url: SEOObject.og_url,
            },
            twitter: {
                creator: SEOObject.twitter_creator,
                description: SEOObject.twitter_description,
                image: SEOObject.twitter_image,
                site: SEOObject.twitter_site,
                title: SEOObject.twitter_title,
            },
        },
        slug: `${typeMap[inferredType]}${article.slug}`,
        tags: article.tags.map(t => t.tag),
        type: typeMap[inferredType],
    };
};
