import { fuzzySlugMatch } from './fuzzy-slug-match';

// given a page slug, find all occurrances in "allSeries"
export const getSeriesPodcasts = (allSeries, targetSlug) => {
    if (!allSeries || !targetSlug) return [];
    const seriesForThisPodcast = [];
    const addSeriesIfContainsSlug = (series, slug) => {
        if (fuzzySlugMatch(targetSlug, slug)) {
            seriesForThisPodcast.push(series);
        }
    };
    allSeries.forEach(series =>
        series.articles.forEach(({ slug: slugInSeries }) =>
            addSeriesIfContainsSlug(series, slugInSeries)
        )
    );
    return seriesForThisPodcast;
};
