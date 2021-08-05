import { Podcast } from '../../interfaces/podcast';


export const aggregateItemsByAudioType = (
    allPodcasts
) => 
    allPodcasts.reduce((accumulator: any,currentItem: Podcast) => {
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