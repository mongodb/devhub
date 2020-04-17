import { get } from './request';

const TWITCH_API_ENDPOINT = 'https://api.twitch.tv/helix/';
const CLIENT_ID = '041r2glmgub2pt357ss0la44j2sz95';
const MDB_CHANNEL_ID = '467752938';
const video_URL = `${TWITCH_API_ENDPOINT}videos?user_id=${MDB_CHANNEL_ID}&first=`;
const headers = { 'Client-ID': CLIENT_ID };

// Fetches videos from twitch api
const fetchTwitchVideos = async (videoLimit = 1) => {
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
