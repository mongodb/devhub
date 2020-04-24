import { buildQueryString } from '../utils/query-string';
import dlv from 'dlv';

const API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YT_API_KEY = 'AIzaSyB2V7htFuJNO2RDrYFzGBzfYmyDVzfK6Yw';

// Fetches data from youtube api

const simplifyResponse = responseData => {
    const video = responseData.snippet;
    const youtubeJSON = {
        media_type: 'youtube',
        title: video['title'],
        published_at: video['publishedAt'],
        description: video['description'],
        videoId: dlv(video, 'resourceId.videoId', []),
        playlistId: video['playlistId'],
        thumbnail_url: dlv(video, 'thumbnails.standard.url', []),
    };

    return youtubeJSON;
};

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
            const responseData = await response.json();
            const videoList = responseData.items.map(simplifyResponse);
            return videoList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchYoutubeData;
