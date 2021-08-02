import { SnootyArticleSeries } from '../../classes/snooty-article-series';

export const mapSnootySeries = (allSeries, slugTitleMapping) =>
    Object.keys(allSeries).map(
        seriesTitle =>
            new SnootyArticleSeries(
                seriesTitle,
                allSeries[seriesTitle],
                slugTitleMapping
            )
    );
