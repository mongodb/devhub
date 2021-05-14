import { requestYoutubePlaylist } from './devhub-api-stitch';
import { transformYoutubeResponse } from './transform-youtube-response';
// Fetches data from youtube api

const fetchYoutubeData = async (maxResults = 5) => {
    try {
        const response = await requestYoutubePlaylist(maxResults);
        if (response) {
            const videoList = response.items.map(transformYoutubeResponse);
            return videoList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchYoutubeData;
