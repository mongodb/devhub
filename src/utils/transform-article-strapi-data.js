import { transformAuthorStrapiData } from './setup/transform-author-strapi-data';
import { parseMarkdownToAST } from './setup/parse-markdown-to-ast';
import { SITE_URL } from '../constants';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';

const typeMap = {
    Article: 'article',
    Community: 'community',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

// This will get more complicated as we build the pipeline out
export const transformArticleStrapiData = article => {
    const inferredType = article.type || 'Article';
    const authors = article.authors || [];
    const transformedAuthors = authors.map(transformAuthorStrapiData);
    const parsedContent = parseMarkdownToAST(article.content);
    const SEOObject = article.SEO || {};
    const fullSlug = `${typeMap[inferredType]}${article.slug}`;
    return {
        ...article,
        authors: transformedAuthors,
        contentAST: parsedContent,
        image: article.image ? article.image.url : null,
        isFromStrapi: true,
        languages: article.languages
            ? article.languages.map(l => l.language)
            : [],
        products: article.products ? article.products.map(p => p.product) : [],
        related: article.related_content
            ? article.related_content.map(({ label, url }) => ({
                  name: 'reference',
                  refuri: url,
                  children: [{ value: label }],
              }))
            : [],
        SEO: {
            canonicalUrl:
                SEOObject.canonical_url ||
                addTrailingSlashIfMissing(`${SITE_URL}/${fullSlug}`),
            metaDescription: SEOObject.meta_description,
            og: {
                description: SEOObject.og_description,
                image: SEOObject.og_image && SEOObject.og_image.url,
                title: SEOObject.og_title || article.name,
                type: SEOObject.og_type,
                url: SEOObject.og_url,
            },
            twitter: {
                card: SEOObject.twitter_card,
                creator: SEOObject.twitter_creator,
                description: SEOObject.twitter_description,
                image: SEOObject.twitter_image && SEOObject.twitter_image.url,
                site: SEOObject.twitter_site,
                title: SEOObject.twitter_title || article.name,
            },
        },
        slug: fullSlug,
        tags: article.tags ? article.tags.map(t => t.tag) : [],
        type: typeMap[inferredType],
    };
};
