import { useEffect, useState } from 'react';
import fetchTwitchVideos from '../utils/fetch-twitch-videos';
import fetchYoutubeData from '../utils/fetch-youtube-data';

const YT_PLAYLIST = 'PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM';

const useAllVideos = () => {
    const [videos, setVideos] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getVideos = async () => {
            setIsLoading(true);
            try {
                const youtubeVideos = fetchYoutubeData(YT_PLAYLIST);
                const twitchVideos = fetchTwitchVideos();

                const allVideos = await Promise.all([
                    youtubeVideos,
                    twitchVideos,
                ]);
                const videoList = allVideos.flat();

                setIsLoading(false);
                setError(null);
                setVideos(videoList);
            } catch (e) {
                setIsLoading(false);
                setError(e);
                setVideos(null);
            }
        };
        getVideos();
    }, []);

    return { videos, error, isLoading };
};

export default useAllVideos;
