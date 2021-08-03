import { fuzzySlugMatch } from './fuzzy-slug-match';

// given a page slug, find all occurrances in "allSeries"
export const getSeriesArticles = (allSeries, targetSlug) => {
    if (!allSeries || !targetSlug) return [];
    const seriesForThisArticle = [];
    const addSeriesIfContainsSlug = (series, slug) => {
        if (fuzzySlugMatch(targetSlug, slug)) {
            seriesForThisArticle.push(series);
        }
    };
    allSeries.forEach(series =>
        series.articles.forEach(({ slug: slugInSeries }) =>
            addSeriesIfContainsSlug(series, slugInSeries)
        )
    );
    return seriesForThisArticle;
};
