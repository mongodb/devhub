import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { fetchBuildTimeMedia } from '../../utils/setup/fetch-build-time-media';
import { Podcast } from '../../interfaces/podcast';

export const createPodcastPages = async (
    createPage: Function,
    allPodcasts: Podcast[],
    metadata: object
) => {
    allPodcasts.forEach((podcast: Podcast) => {
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const publishDate = new Date(podcast.publishDate);
        const slug = `/podcasts/${getTagPageUriComponent(podcast.title)}`;
        podcast.slug = slug;
        podcast.publishDate = months[publishDate.getMonth()+1] + " " + publishDate.getDate() + ", " + publishDate.getFullYear();
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/podcast.tsx`),
            context: {
                metadata,
                data: podcast,
            },
        });
    });
};