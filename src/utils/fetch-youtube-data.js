import { requestYoutubePlaylist } from './devhub-api-stitch';
import { simplifyYoutubeResponse } from './simplify-youtube-response';
import { BuildError } from '../classes/build-error';
// Fetches data from youtube api

const fetchYoutubeData = async (maxResults = 5) => {
    try {
        const response = await requestYoutubePlaylist(maxResults);
        if (response) {
            const videoList = response.items.map(simplifyYoutubeResponse);
            return videoList;
        }
    } catch (e) {
        new BuildError(e);
    }
    return [];
};

export default fetchYoutubeData;
