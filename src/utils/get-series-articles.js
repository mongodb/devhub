import { fuzzySlugMatch } from './fuzzy-slug-match';

// given a page slug, find all occurrances in "allSeries"
export const getSeriesArticles = (allSeries, slug) => {
    if (!allSeries || !slug) return [];
    const seriesForThisArticle = [];
    allSeries.forEach(series => {
        const slugs = series.articles.map(({ slug }) => slug);
        slugs.forEach(newSlug => {
            if (fuzzySlugMatch(newSlug, slug)) {
                seriesForThisArticle.push(series);
            }
        });
    });
    return seriesForThisArticle;
};
