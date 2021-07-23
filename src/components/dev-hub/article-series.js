import React from 'react';
import Series from './series';

const ArticleSeries = ({ allSeriesForArticle, title }) => {
    // Handle if this article is not in a series or no series are defined
    if (!allSeriesForArticle) return null;
    const getMappedSeries = articles => {
        if (!articles || !articles.length) return null;

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
        const mappedSeries = articles.map(({ slug, title }) => {
            const position = getSeriesArticlePosition(title);
            return {
                position,
                slug,
                title,
            };
        });

        return mappedSeries;
    };

    return allSeriesForArticle.map(({ articles, title }) => {
        const seriesItems = getMappedSeries(articles);
        return <Series name={title}>{seriesItems}</Series>;
    });
};

export default ArticleSeries;
