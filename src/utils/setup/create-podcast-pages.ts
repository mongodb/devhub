import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { Podcast } from '../../interfaces/podcast';
import { formatDateToPublishDateFormat } from '../format-dates';
       
export const createPodcastPages = async (
    createPage: Function,
    allPodcasts: Podcast[],
    metadata: object
) => {
    allPodcasts.forEach((podcast: Podcast) => {
        const slug = `/podcasts/${getTagPageUriComponent(podcast.title)}`;
        podcast.slug = slug;
        podcast.publishDate = formatDateToPublishDateFormat(new Date(podcast.publishDate));
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