export const getSeriesAndContentMapping = (series, contentType) => {
    const seriesToContentMap = {};
    const contentToSeriesMap = {};
    series.map(seriesEntry =>
        getMapping(
            seriesEntry,
            seriesToContentMap,
            contentToSeriesMap,
            contentType
        )
    );
    return {
        seriesToContentMap: seriesToContentMap,
        contentToSeriesMap: contentToSeriesMap,
    };
};

const getMapping = (
    SeriesItem,
    seriesToContentMap,
    contentToSeriesMap,
    contentType
) => {
    const articles = [];
    SeriesItem.seriesEntry.forEach(entry => {
        const slug =
            contentType === 'podcast' ? entry.podcast.slug : entry.video.slug;
        const title =
            contentType === 'podcast' ? entry.podcast.title : entry.video.title;
        articles.push({ slug: slug, title: title });
        const seriesOfSlug =
            contentToSeriesMap[slug] !== undefined
                ? contentToSeriesMap[slug]
                : [];
        seriesOfSlug.push(SeriesItem.title);
        contentToSeriesMap[slug] = seriesOfSlug;
    });
    seriesToContentMap[SeriesItem.title] = {
        articles: articles,
        title: SeriesItem.title,
    };
};
