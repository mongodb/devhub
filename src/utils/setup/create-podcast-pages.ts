import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { Podcast } from '../../classes/podcast';
import { getSeriesPodcasts } from '../get-series-podcasts';
import { formatDateToPublishDateFormat } from '../format-dates';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
       
export const createPodcastPages = async (
    createPage: Function,
    allPodcasts: Podcast[],
    slugContentMapping: any,
    podcastSeries: object,
    metadata: object
) => {
    allPodcasts.forEach((podcast: Podcast) => {
        podcast.related = getRelatedPagesWithImages(
            podcast.related,
            slugContentMapping
        );
        const seriesPodcasts = getSeriesPodcasts(podcastSeries, podcast['slug']);
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