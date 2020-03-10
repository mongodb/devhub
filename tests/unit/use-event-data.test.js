import { removePastEvents, sortEvents } from '../../src/hooks/use-event-data';

const events = [
    {
        node_type_attributes: {
            event_start: '4020-03-11T09:00:00.000Z',
            event_end: '4020-03-11T13:30:00.000Z',
            event_city: 'Stockholm',
            event_country: 'Sweden',
        },
        title: 'MongoDB Atlas on GCP Workshop ',
        url: 'https://gcpstockholmworkshop.splashthat.com/',
        url_type: 'external',
    },
    {
        node_type_attributes: {
            event_start: '2000-03-12T22:00:00.000Z',
            event_end: '2000-03-13T00:00:00.000Z',
            event_city: 'Coppell, TX',
            event_country: 'United States',
        },
        title: 'Happy Hour with MongoDB',
        url: 'events/happy-hour-with-mongodb-mr-cooper',
        url_type: 'alias',
    },
];

it('should remove events that have past', () => {
    const filtered = removePastEvents(events);
    expect(filtered).toEqual([events[0]]);
});

it('should sort all events', () => {
    expect(sortEvents(events)).toEqual([events[1], events[0]]);
});
