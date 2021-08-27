import { requestMDBTwitchVideos } from './devhub-api-stitch';
import { simplifyTwitchResponse } from './simplify-twitch-response';
import { BuildError } from '../classes/build-error';
// Fetches videos from twitch api

const fetchTwitchVideos = async videoLimit => {
    try {
        const videoResp = await requestMDBTwitchVideos(videoLimit);
        const videoList = videoResp.data.map(simplifyTwitchResponse);
        // return the whole array of videos, but ignore pagination for now
        return videoList;
    } catch (error) {
        new BuildError(error);
    }

    return [];
};

export default fetchTwitchVideos;
