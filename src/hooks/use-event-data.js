import { useEffect, useState } from 'react';
import fetchEventData from '../utils/fetch-event-data';
import fetchLiveEventData from '../utils/fetch-live-event-data';

const useEventData = url => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const eventData = await fetchEventData(url);
                const liveData = await fetchLiveEventData();
                const allData = [...eventData, ...liveData].sort(
                    (a, b) =>
                        new Date(a.node_type_attributes.event_start) -
                        new Date(b.node_type_attributes.event_start)
                );
                setIsLoading(false);
                setError(null);
                setEvents(allData);
            } catch (e) {
                setIsLoading(false);
                setError(e);
                setEvents(null);
            }
        };
        getData();
    }, [url]);

    return [events, error, isLoading];
};

export default useEventData;
