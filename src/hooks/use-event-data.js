import React, { useEffect, useState } from 'react';

export const sampleEvents = [
    {
        title: 'MongoDB.local San Francisco',
        node_type_attributes: {
            event_start: '2020-02-27T05:00:00.000Z',
            event_end: '2020-02-27T05:00:00.000Z',
            event_country: 'United States',
            event_city: 'San Francisco',
        },
        url: 'https://mongodbanddatabricks.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-01-29T05:00:00.000Z',
            event_end: '2020-01-29T05:00:00.000Z',
            event_country: 'United States',
            event_city: 'New York City',
        },
        title: 'Coffe With Your Data: Real-Time Analytics',
        url: 'https://mongodbanddatabricks.splashthat.com',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2019-12-11T18:30:00.000Z',
            event_end: '2019-12-11T11:59:00.000Z',
            event_country: 'United Kingdom',
            event_city: 'London',
        },
        title: 'MongoDB.local London',
        url: 'events/bhm20',
        url_type: 'alias',
    },
    {
        node_type_attributes: {
            event_start: '2020-06-11T18:30:00.000Z',
            event_end: '2020-06-11T11:59:00.000Z',
            event_country: 'United Kingdom',
            event_city: 'London',
        },
        title: 'MongoDB.local London',
        url: 'events/bhm20',
        url_type: 'alias',
    },
    {
        node_type_attributes: {
            event_start: '2020-04-11T18:30:00.000Z',
            event_end: '2020-04-11T11:59:00.000Z',
            event_country: 'Germany',
            event_city: 'Berlin',
        },
        title: 'MongoDB.local Berlin',
        url: 'https://mongodbanddatabricks.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-05-11T18:30:00.000Z',
            event_end: '2020-05-11T11:59:00.000Z',
            event_country: 'France',
            event_city: 'Paris',
        },
        title: 'MongoDB.local Paris',
        url: 'https://mongodbanddatabricks.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-06-11T18:30:00.000Z',
            event_end: '2020-06-11T11:59:00.000Z',
            event_country: 'Ireland',
            event_city: 'Dublin',
        },
        title: 'MongoDB.local Dublin',
        url: 'https://mongodbanddatabricks.splashthat.com/',
        url_type: 'external',
    },
];

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
                setEvents(sampleEvents);
            }
        };
        getData();
    }, [url]);

    return [events, error];
};

export default useEventData;
