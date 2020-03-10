import { removePastEvents, sortEvents } from '../../src/hooks/use-event-data';

const events = [
    {
        node_type_attributes: {
            event_start: '4020-03-11T09:00:00.000Z',
            event_end: '4020-03-11T13:30:00.000Z',
        },
    },
    {
        node_type_attributes: {
            event_start: '2000-03-12T22:00:00.000Z',
            event_end: '2000-03-13T00:00:00.000Z',
        },
    },
];

it('should remove events that have past', () => {
    const filtered = removePastEvents(events);
    expect(filtered).toEqual([events[0]]);
});

it('should sort all events', () => {
    expect(sortEvents(events)).toEqual([events[1], events[0]]);
});
