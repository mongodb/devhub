import { fuzzySlugMatch } from '../fuzzy-slug-match';

export const findArticleWithSlug = (allArticles, slug) =>
    allArticles.find(x => fuzzySlugMatch(x.slug, slug));

export const findArticlesFromSlugs = (allArticles, articleSlugs, maxSize) => {
    const result = [];
    // If maxSize is undefined, this will return a shallow copy of articleSlugs
    articleSlugs.slice(0, maxSize).forEach((featuredSlug, i) => {
        const targetArticle = findArticleWithSlug(allArticles, featuredSlug);
        if (targetArticle) {
            result.push(targetArticle);
        } else {
            // This article was not found. pick an existing article and add it instead.
            result.push(allArticles[i]);
        }
    });
    return result;
};
