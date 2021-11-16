import path from 'path';
import { Video } from '../../interfaces/video';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
import { getOtherContentFromTheSeries } from '../get-other-content-from-series';
import { getSeriesAndContentMapping } from '../get-mediaseries-content-maps';


export const createVideoPages = async (
    createPage: Function,
    allVideos: Video[],
    slugContentMapping: any,
    videoSeries: object,
    metadata: object
) => {
    const seriesAndContentMaps = getSeriesAndContentMapping(videoSeries,'video');
    allVideos.forEach((video: Video) => {
        video.related = getRelatedPagesWithImages(
            video.related,
            slugContentMapping
        );
        const seriesVideos = getOtherContentFromTheSeries(seriesAndContentMaps, video.slug);
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
