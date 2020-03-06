import { useState, useEffect, useCallback } from 'react';
import { get } from './request';

const TWITCH_API_ENDPOINT = 'https://api.twitch.tv/helix/';
const CLIENT_ID = '041r2glmgub2pt357ss0la44j2sz95';
const MDB_CHANNEL_ID = '467752938';
const STREAMS_URL = `${TWITCH_API_ENDPOINT}streams?user_id=${MDB_CHANNEL_ID}`;
const video_URL = `${TWITCH_API_ENDPOINT}videos?user_id=${MDB_CHANNEL_ID}&first=`;

const headers = { 'Client-ID': CLIENT_ID };

/**
 * @param {Object} config
 * @param {boolean=} config.getStream
 * @param {number=} config.videoLimit number of previous videos to return
 * @returns {Object} {error, stream, pending, videos}
 */
export default ({ getStream = true, videoLimit = 1 } = {}) => {
    const [error, setError] = useState(null);
    const [stream, setStream] = useState(null);
    const [pending, setPending] = useState(true);
    const [videos, setVideos] = useState(null);

    const callTwitch = useCallback(async () => {
        setPending(true);
        let currentStream = null;
        try {
            // Get stream
            if (getStream) {
                const streamResp = await get(STREAMS_URL, headers);
                // since we're only interested in one channel just get the first
                currentStream = streamResp.data[0];
                if (currentStream) {
                    currentStream.url = `https://twitch.tv/${currentStream.user_name}`;
                }
                setStream(currentStream);
            }
            //get videos
            if (!currentStream && videoLimit) {
                const videoResp = await get(video_URL + videoLimit, headers);
                // return the whole array of videos, but ignore pagination for now
                setVideos(videoResp.data);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
        setPending(false);
    }, [getStream, videoLimit]);

    useEffect(() => {
        callTwitch();
    }, [callTwitch]);

    return { error, stream, pending, videos };
};
