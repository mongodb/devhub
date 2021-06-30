import path from 'path';
import { Video } from '../../interfaces/video';

export const createVideoPages = async (
    createPage: Function,
    allVideos: any,
    metadata: object
) => {
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
