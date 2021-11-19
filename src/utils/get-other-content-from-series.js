export const getOtherContentFromTheSeries = (
    seriesAndContentMaps,
    targetSlug
) => {
    if (!targetSlug) return [];
    const seriesForThisPodcast =
        seriesAndContentMaps.contentToSeriesMap[targetSlug];
    if (!seriesForThisPodcast) return [];
    return seriesForThisPodcast.map(
        s => seriesAndContentMaps.seriesToContentMap[s]
    );
};
