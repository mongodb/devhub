import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { fetchBuildTimeMedia } from '../../utils/setup/fetch-build-time-media';
import { Podcast } from '../../interfaces/podcast';

export const createPodcastPages = async (
    createPage: Function,
    allPodcasts: Podcast[],
    metadata: object
) => {
    allPodcasts.map((podcast: Podcast) => {
        const publishDate = new Date(podcast.publishDate).toDateString();
        const slug = `/podcasts/${getTagPageUriComponent(podcast.title)}`;
        podcast.slug = slug;
        podcast.publishDate = publishDate.substr(publishDate.indexOf(' ') + 1);
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/podcast.tsx`),
            context: {
                metadata: metadata,
                data: podcast,
            },
        });
    });
};