import { useState, useEffect, useCallback } from 'react';
import fetchTwitchVideos from '../utils/fetch-twitch-videos';
import { get } from '../utils/request';
import { TWITCH_HEADERS, TWITCH_STREAMS_URL } from '../constants';

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
                const streamResp = await get(
                    TWITCH_STREAMS_URL,
                    TWITCH_HEADERS
                );
                // since we're only interested in one channel just get the first
                currentStream = streamResp.data[0];
                if (currentStream) {
                    currentStream.url = `https://twitch.tv/${currentStream.user_name}`;
                }
                setStream(currentStream);
            }
            //get videos
            if (!currentStream && videoLimit) {
                const videoRespData = await fetchTwitchVideos(videoLimit);
                setVideos(videoRespData);
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
