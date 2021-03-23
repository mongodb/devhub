// This will get more complicated as we build the pipeline out
export const transformArticleStrapiData = article => ({
    ...article,
    languages: article.languages.map(l => l.language),
    products: article.products.map(p => p.product),
    tags: article.tags.map(t => t.tag),
});
