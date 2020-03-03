import React, { useEffect, useState } from 'react';

export const sampleEvents = [
    {
        node_type_attributes: {
            event_start: '2020-03-11T09:00:00.000Z',
            event_end: '2020-03-11T13:30:00.000Z',
            event_city: 'Stockholm',
            event_country: 'Sweden',
        },
        title: 'MongoDB Atlas on GCP Workshop ',
        url: 'https://gcpstockholmworkshop.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-03-12T22:00:00.000Z',
            event_end: '2020-03-13T00:00:00.000Z',
            event_city: 'Coppell, TX',
            event_country: 'United States',
        },
        title: 'Happy Hour with MongoDB',
        url: 'events/happy-hour-with-mongodb-mr-cooper',
        url_type: 'alias',
    },
    {
        node_type_attributes: {
            event_start: '2020-03-17T13:30:00.000Z',
            event_end: '2020-03-17T22:30:00.000Z',
            event_city: 'Seattle',
            event_country: 'United States',
        },
        title: 'MongoDB.local Seattle',
        url: 'https://dotlocalseattle.mongodb.events/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-03-18T09:00:00.000Z',
            event_end: '2020-03-18T14:00:00.000Z',
            event_city: 'London',
            event_country: 'United Kingdom',
        },
        title: 'MongoDB Atlas on GCP Workshop ',
        url: 'https://mdbgcpworkshop.splashthat.com',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2020-03-26T16:30:00.000Z',
            event_end: '2020-03-26T23:00:00.000Z',
            event_city: 'Houston, TX',
            event_country: 'United States',
        },
        title:
            'Global Cloud Strategy with MongoDB, Datadog, Alibaba, and Deloitte',
        url:
            'https://www.datadoghq.com/event/houston-cloudstrategy-lunch/?utm_source=email&utm_medium=FieldMarketing&utm_campaign=Bespoke-202003GlobalCloudStrategyLunchHoustonMongoDB',
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
