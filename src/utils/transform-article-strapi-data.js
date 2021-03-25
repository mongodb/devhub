const typeMap = {
    Article: 'article',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

// This will get more complicated as we build the pipeline out
export const transformArticleStrapiData = article => ({
    ...article,
    image: article.image.url,
    languages: article.languages.map(l => l.language),
    products: article.products.map(p => p.product),
    slug: `/${typeMap[article.type]}${article.slug}`,
    tags: article.tags.map(t => t.tag),
    type: typeMap[article.type],
});
