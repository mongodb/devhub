import { requestMDBTwitchVideos } from './devhub-api-stitch';
import { simplifyTwitchResponse } from './simplify-twitch-response';

// Fetches videos from twitch api

const fetchTwitchVideos = async videoLimit => {
    try {
        const videoResp = await requestMDBTwitchVideos(videoLimit);
        const videoList = videoResp.data.map(simplifyTwitchResponse);
        // return the whole array of videos, but ignore pagination for now
        return videoList;
    } catch (error) {
        console.error(error);
    }

    return [];
};

export default fetchTwitchVideos;
