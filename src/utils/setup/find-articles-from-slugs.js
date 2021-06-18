import { addLeadingSlashIfMissing } from '../add-leading-slash-if-missing';
import { addTrailingSlashIfMissing } from '../add-trailing-slash-if-missing';

export const findArticleWithSlug = (allArticles, slug) => {
    const targetSlug = addLeadingSlashIfMissing(
        addTrailingSlashIfMissing(slug)
    );
    const targetArticle = allArticles.find(
        x =>
            addLeadingSlashIfMissing(addTrailingSlashIfMissing(x.slug)) ===
            targetSlug
    );
    if (targetArticle) {
        return targetArticle;
    }
};

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
