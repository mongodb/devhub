import { useEffect, useState } from 'react';

export const removePastEvents = events => {
    const today = new Date();
    return events.filter(
        e =>
            new Date(e.node_type_attributes.event_end) >= today &&
            e.status === 'published'
    );
};

const useEventData = url => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const data = await fetch(url, {
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (data) {
                    const parsedData = await data.json();
                    const upcomingEvents = removePastEvents(parsedData);
                    setIsLoading(false);
                    setError(null);
                    setEvents(upcomingEvents.reverse());
                }
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
