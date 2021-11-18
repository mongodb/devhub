import path from 'path';
import { Podcast } from '../../classes/podcast';
import { formatDateToPublishDateFormat } from '../format-dates';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
import { getOtherContentFromTheSeries } from '../get-other-content-from-series';
import { getSeriesAndContentMapping } from '../get-mediaseries-content-maps';
       
export const createPodcastPages = async (
    createPage: Function,
    allPodcasts: Podcast[],
    slugContentMapping: any,
    podcastSeries: object,
    metadata: object
) => {
    const seriesAndContentMaps = getSeriesAndContentMapping(podcastSeries,'podcast');
    allPodcasts.forEach((podcast: Podcast) => {
        podcast.related = getRelatedPagesWithImages(
            podcast.related,
            slugContentMapping
        );
        const seriesPodcasts = getOtherContentFromTheSeries(seriesAndContentMaps, podcast['slug']);
        podcast.publishDate = formatDateToPublishDateFormat(new Date(podcast.publishDate));
        createPage({
            path: podcast['slug'],
            component: path.resolve(`./src/templates/podcast.tsx`),
            context: {
                metadata,
                data: podcast,
                seriesPodcasts
            },
        });
    });
};