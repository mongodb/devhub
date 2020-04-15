import { useEffect, useState } from 'react';
import fetchEventData from '../utils/fetch-event-data';
import fetchLiveEventData from '../utils/fetch-live-event-data';

const useEventData = () => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const eventData = fetchEventData();
                const liveData = fetchLiveEventData();
                const allData = await Promise.all([eventData, liveData]);
                const events = allData
                    .flat(1)
                    .sort(
                        (a, b) =>
                            new Date(a.node_type_attributes.event_start) -
                            new Date(b.node_type_attributes.event_start)
                    );
                setIsLoading(false);
                setError(null);
                setEvents(events);
            } catch (e) {
                setIsLoading(false);
                setError(e);
                setEvents(null);
            }
        };
        getData();
    }, []);

    return [events, error, isLoading];
};

export default useEventData;
