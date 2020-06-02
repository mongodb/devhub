import { requestYoutubePlaylist } from './devhub-api-stitch';
import { simplifyYoutubeResponse } from './simplify-youtube-response';
// Fetches data from youtube api

const fetchYoutubeData = async (maxResults = 5) => {
    try {
        const response = await requestYoutubePlaylist(maxResults);
        if (response) {
            const videoList = response.items.map(simplifyYoutubeResponse);
            return videoList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchYoutubeData;
