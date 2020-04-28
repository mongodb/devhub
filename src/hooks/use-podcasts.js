import { useEffect, useState } from 'react';
import fetchLybsinPodcasts from '../utils/fetch-lybsin-podcasts';

const usePodcasts = () => {
    const [podcasts, setPodcasts] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMedia = async () => {
            setIsLoading(true);
            try {
                const lybsinPodcasts = fetchLybsinPodcasts();

                const podcastList = await Promise.all([lybsinPodcasts]);

                setIsLoading(false);
                setError(null);
                setPodcasts(podcastList);
            } catch (e) {
                setIsLoading(false);
                setError(e);
                setPodcasts(null);
            }
        };
        getMedia();
    }, []);

    return { podcasts, error, isLoading };
};

export default usePodcasts;
