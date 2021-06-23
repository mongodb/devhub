import { Video } from '../../interfaces/video';

export const aggregateItemsByVideoType = (
    allVideos
) => 
    allVideos.reduce((accumulator: any,currentItem: Video) => {
        const addItemToAccumulator = v => {
            if (accumulator[v]) {
                accumulator[v].push(currentItem);
            } else {
                accumulator[v] = [currentItem];
            }
        };
        addItemToAccumulator(currentItem.mediaType);
        return accumulator;
    },{});