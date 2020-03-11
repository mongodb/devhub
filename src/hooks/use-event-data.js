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
    useEffect(() => {
        const getData = async () => {
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
                    setError(null);
                    setEvents(upcomingEvents.reverse());
                }
            } catch (e) {
                setError(e);
                setEvents(null);
            }
        };
        getData();
    }, [url]);

    return [events, error];
};

export default useEventData;
