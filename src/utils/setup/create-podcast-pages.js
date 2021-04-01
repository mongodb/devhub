import path from 'path';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';
import { fetchBuildTimeMedia } from '../../utils/setup/fetch-build-time-media';

export const createPodcastPages = async (createPage, metadataDocument) => {
    const { allPodcasts } = await fetchBuildTimeMedia();

    allPodcasts.forEach(podcast => {
        const urlSuffix = getTagPageUriComponent(podcast.title);
        createPage({
            path: `/podcasts/${urlSuffix}`,
            component: path.resolve(`./src/templates/podcast.js`),
            context: {
                metadata: metadataDocument,
                data: podcast,
            },
        });
    });
};
