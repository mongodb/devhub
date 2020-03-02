// given a page slug, find all occurrances in "allSeries"
const getSeriesArticles = (allSeries, slug) => {
    if (!allSeries || !slug) return [];
    const series = Object.keys(allSeries);
    const seriesForThisArticle = {};
    series.forEach(s => {
        if (allSeries[s].includes(slug)) seriesForThisArticle[s] = allSeries[s];
    });
    console.log(seriesForThisArticle);
    return seriesForThisArticle;
};

module.exports.getSeriesArticles = getSeriesArticles;
