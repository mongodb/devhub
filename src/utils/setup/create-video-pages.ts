import path from 'path';
import { Video } from '../../interfaces/video';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';

export const createVideoPages = async (
    createPage: Function,
    allVideos: any,
    slugContentMapping: any,
    metadata: object
) => {
    allVideos.forEach((video: Video) => {
        video.related = getRelatedPagesWithImages(
            video.related,
            slugContentMapping
        );
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
