import { buildQueryString } from '../utils/query-string';

const API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';

// Fetches data from youtube api
const fetchYoutubeData = async (KEY, PLAYLIST_ID, maxResults) => {
    const options = {
        playlistId: PLAYLIST_ID,
        key: KEY,
        part: 'snippet',
        maxResults: maxResults,
    };

    try {
        const queryString = buildQueryString(options);
        const request = API_ENDPOINT + queryString;
        const response = await fetch(request);
        if (response) {
            const parsedData = await response.json();
            const videoIDList = parsedData.items.map(
                item => item.snippet.resourceId.videoId
            );
            return videoIDList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchYoutubeData;
