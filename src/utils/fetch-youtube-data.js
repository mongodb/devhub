import dlv from 'dlv';
import { requestYoutubePlaylist } from './request-stitch';
// Fetches data from youtube api

const simplifyResponse = responseData => {
    const video = responseData.snippet;
    const youtubeJSON = {
        mediaType: 'youtube',
        title: video['title'],
        publishDate: video['publishedAt'],
        description: video['description'],
        videoId: dlv(video, 'resourceId.videoId', []),
        playlistId: video['playlistId'],
        thumbnailUrl: dlv(video, 'thumbnails.standard.url', []),
    };

    return youtubeJSON;
};

const fetchYoutubeData = async (playlistId, maxResults = 5) => {
    try {
        const response = await requestYoutubePlaylist(playlistId, maxResults);
        if (response) {
            const videoList = response.items.map(simplifyResponse);
            return videoList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchYoutubeData;
