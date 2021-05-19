import path from 'path';
import { fetchBuildTimeMedia } from './fetch-build-time-media';
import { Video } from '../../interfaces/video';

export const createVideoPages = async (
    createPage: Function,
    metadata: object
) => {
    const { allVideos } = await fetchBuildTimeMedia();

    allVideos.forEach((video: Video) => {
        createPage({
            path: video.slug,
            component: path.resolve('./src/templates/video.tsx'),
            context: {
                metadata,
                data: video,
            },
        });
    });
};
