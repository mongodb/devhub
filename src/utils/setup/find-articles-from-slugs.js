import { fuzzySlugMatch } from '../fuzzy-slug-match';

export const findArticleWithSlug = (allArticles, slug) =>
    allArticles.find(
        article => !!article && fuzzySlugMatch(article.slug, slug)
    );

export const findArticlesFromSlugs = (allArticles, articleSlugs, maxSize) => {
    const result = [];
    if (maxSize) {
        articleSlugs.length = maxSize;
    }
    const articleIterator = allArticles
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        [Symbol.iterator]();
    // If maxSize is undefined, this will return a shallow copy of articleSlugs
    articleSlugs.forEach(featuredSlug => {
        const targetArticle = findArticleWithSlug(allArticles, featuredSlug);
        if (targetArticle) {
            result.push(targetArticle);
        } else {
            // This article was not found. pick an existing article and add it instead.
            const mostRecentUnfeaturedArticle = articleIterator.next().value;
            // We should check this is not yet featured
            result.push(mostRecentUnfeaturedArticle);
        }
    });
    // Fill result with the rest
    return result;
};
