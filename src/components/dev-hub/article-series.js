import React from 'react';
import dlv from 'dlv';
import Series from './series';

const ArticleSeries = ({ allSeriesForArticle, slugTitleMapping, title }) => {
    // Handle if this article is not in a series or no series are defined
    if (!allSeriesForArticle) return null;
    const getMappedSeries = seriesSlugs => {
        if (!seriesSlugs || !seriesSlugs.length) return null;

        let hasSeenActiveSlug = false;
        const getSeriesArticlePosition = articleTitle => {
            // Find if an article is the current one in the series, or is upcoming/past
            if (hasSeenActiveSlug) {
                return 'upcoming';
            } else if (articleTitle === title) {
                hasSeenActiveSlug = true;
                return 'active';
            }
            return 'past';
        };

        const mappedSeries = seriesSlugs.map(slug => {
            const title = dlv(slugTitleMapping, [slug, 0, 'value'], slug);
            const position = getSeriesArticlePosition(title);
            return {
                position,
                slug,
                title,
            };
        });
        return mappedSeries;
    };

    return Object.keys(allSeriesForArticle).map(series => {
        const seriesItems = getMappedSeries(allSeriesForArticle[series]);
        return <Series name={series}>{seriesItems}</Series>;
    });
};

export default ArticleSeries;
