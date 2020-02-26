import React, { useEffect, useState } from 'react';

const useEventData = url => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                // TODO: Get this working once cors issues resolved
                const data = await fetch(url, {
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (data) {
                    setError(null);
                    setEvents(data);
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
