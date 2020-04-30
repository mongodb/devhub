import { get } from './request';
import { TWITCH_HEADERS, TWITCH_VIDEO_URL } from '../constants';

// Fetches videos from twitch api

const simplifyResponse = video => {
    const twitchJSON = {
        mediaType: 'twitch',
        title: video['title'],
        publishDate: video['published_at'],
        description: video['description'],
        thumbnailUrl: video['thumbnail_url'],
        videoId: video['id'],
    };

    return twitchJSON;
};

const fetchTwitchVideos = async (
    videoLimit,
    headers = TWITCH_HEADERS,
    videoURL = TWITCH_VIDEO_URL
) => {
    try {
        if (videoLimit) {
            videoURL = TWITCH_VIDEO_URL + '&first=' + videoLimit;
        }
        const videoResp = await get(videoURL, headers);
        const videoList = videoResp.data.map(simplifyResponse);
        // return the whole array of videos, but ignore pagination for now
        return videoList;
    } catch (error) {
        console.error(error);
    }

    return [];
};

export default fetchTwitchVideos;
