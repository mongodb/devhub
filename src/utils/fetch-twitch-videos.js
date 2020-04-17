import { get } from './request';

// Fetches videos from twitch api
const fetchTwitchVideos = async (headers, video_URL, videoLimit = 1) => {
    try {
        const videoResp = await get(video_URL + videoLimit, headers);
        // return the whole array of videos, but ignore pagination for now
        return videoResp.data;
    } catch (error) {
        console.error(error);
    }

    return [];
};

export default fetchTwitchVideos;
