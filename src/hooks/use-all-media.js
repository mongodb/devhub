import { useEffect, useState } from 'react';
import fetchTwitchVideos from '../utils/fetch-twitch-videos';
import fetchYoutubeData from '../utils/fetch-youtube-data';
import fetchLybsinPodcasts from '../utils/fetch-lybsin-podcasts';

const YT_PLAYLIST = 'PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM';

const useAllMedia = () => {
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMedia = async () => {
            setIsLoading(true);
            try {
                const youtubeVideos = fetchYoutubeData(YT_PLAYLIST);
                const twitchVideos = fetchTwitchVideos();
                const lybsinPodcasts = fetchLybsinPodcasts();

                const allMedia = await Promise.all([
                    youtubeVideos,
                    twitchVideos,
                    lybsinPodcasts,
                ]);
                const mediaList = allMedia.flat();

                setIsLoading(false);
                setError(null);
                setMedia(mediaList);
            } catch (e) {
                setIsLoading(false);
                setError(e);
                setMedia(null);
            }
        };
        getMedia();
    }, []);

    return { media, error, isLoading };
};

export default useAllMedia;
