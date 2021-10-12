import { fuzzySlugMatch } from '../fuzzy-slug-match';

export const findArticleWithSlug = (allArticles, slug) =>
    allArticles.find(
        article => !!article && fuzzySlugMatch(article.slug, slug)
    );

export const findArticlesFromSlugs = (allArticles, articleSlugs) => {
    const articleIterator = allArticles[Symbol.iterator]();
    const articleObjects = articleSlugs.map(slug =>
        findArticleWithSlug(allArticles, slug)
    );
    // Recursive function to get the next article and check if it is already on this
    // page, if so let's pick the next one
    const findOrFillArticleFromSlug = () => {
        // This article was not found. pick an existing article and add it instead.
        const { done, value } = articleIterator.next();
        if (done) return null;
        // We should check this is not yet featured
        else if (!articleObjects.includes(value)) {
            return value;
        }
        return findOrFillArticleFromSlug();
    };
    const result = articleObjects
        // If we didn't find an article object for that slug, pull the next article
        .map(article => article || findOrFillArticleFromSlug())
        // Handle the case there were not enough articles to feature, remove nulls
        .filter(a => !!a);
    return result;
};

export const findAndFillArticlesFromSlugs = (
    allArticles,
    articleSlugs,
    size,
    sortFn
) => {
    if (size && size !== articleSlugs.length) {
        const result = [];
        for (let i = 0; i < size; i++) {
            result.push(articleSlugs[i] || null);
        }
        articleSlugs = result;
    }
    if (sortFn) {
        // Have to make a copy to not modify the original array passed
        allArticles = [...allArticles].sort(sortFn);
    }
    return findArticlesFromSlugs(allArticles, articleSlugs);
};
