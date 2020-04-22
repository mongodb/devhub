import { useEffect, useState } from 'react';
import fetchTwitchVideos from '../utils/fetch-twitch-videos';
import fetchYoutubeData from '../utils/fetch-youtube-data';
import fetchLybsinPodcasts from '../utils/fetch-lybsin-podcasts';
import { TWITCH_HEADERS, TWITCH_VIDEO_URL } from '../constants';

const useAllMedia = () => {
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const YT_PLAYLIST = 'PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM';

    useEffect(() => {
        const getMedia = async () => {
            setIsLoading(true);
            try {
                const youtubeVideos = fetchYoutubeData(YT_PLAYLIST);
                const twitchVideos = fetchTwitchVideos(
                    TWITCH_HEADERS,
                    TWITCH_VIDEO_URL
                );
                const lybsinPodcasts = fetchLybsinPodcasts();

                const allMedia = await Promise.all([
                    youtubeVideos,
                    twitchVideos,
                    lybsinPodcasts,
                ]);
                const media_list = allMedia.flat(1);

                setIsLoading(false);
                setError(null);
                setMedia(media_list);
            } catch (e) {
                setIsLoading(false);
                setError(e);
                setMedia(null);
            }
        };
        getMedia();
    }, []);

    return [media, error, isLoading];
};

export default useAllMedia;
