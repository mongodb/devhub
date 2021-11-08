import path from 'path';
import { Video } from '../../interfaces/video';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
import { getSeriesPodcasts } from '../get-series-podcasts';

export const createVideoPages = async (
    createPage: Function,
    allVideos: Video[],
    slugContentMapping: any,
    videoSeries: object,
    metadata: object
) => {
    allVideos.forEach((video: Video) => {
        video.related = getRelatedPagesWithImages(
            video.related,
            slugContentMapping
        );
        const seriesVideos = getSeriesPodcasts(videoSeries, video.slug);
        createPage({
            path: video.slug,
            component: path.resolve('./src/templates/video.tsx'),
            context: {
                metadata,
                data: video,
                seriesVideos
            },
        });
    });
};
