import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { Podcast } from '../../interfaces/podcast';
import { getSeriesPodcasts } from '../get-series-podcasts';
import { formatDateToPublishDateFormat } from '../format-dates';
       
export const createPodcastPages = async (
    createPage: Function,
    allPodcasts: Podcast[],
    podcastSeries: object,
    metadata: object
) => {
    allPodcasts.forEach((podcast: Podcast) => {
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