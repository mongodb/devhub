import { buildQueryString } from '../utils/query-string';

const API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YT_API_KEY = 'AIzaSyB2V7htFuJNO2RDrYFzGBzfYmyDVzfK6Yw';

// Fetches data from youtube api
const fetchYoutubeData = async (PLAYLIST_ID, maxResults = 5) => {
    const options = {
        playlistId: PLAYLIST_ID,
        key: YT_API_KEY,
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
