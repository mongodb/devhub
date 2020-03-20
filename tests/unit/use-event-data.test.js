import { removePastEvents } from '../../src/hooks/use-event-data';
import { createDateObject } from '../../src/utils/format-dates';

const events = [
    {
        node_type_attributes: {
            event_start: '4020-03-11T09:00:00.000Z',
            event_end: '4020-03-11T13:30:00.000Z',
        },
        status: 'published',
    },
    {
        node_type_attributes: {
            event_start: '2000-03-12T22:00:00.000Z',
            event_end: '2000-03-13T00:00:00.000Z',
        },
        status: 'published',
    },
];

const today = createDateObject(new Date());
const todayAsia = today.toLocaleString('en-US', {
    timeZone: 'Asia/Shanghai',
});

const timezonedEvents = [
    {
        node_type_attributes: {
            event_start: todayAsia,
            event_end: todayAsia,
        },
        status: 'published',
    },
    {
        node_type_attributes: {
            event_start: new Date(),
            event_end: new Date(),
        },
        status: 'published',
    },
];
it('should remove events that have past', () => {
    const filtered = removePastEvents(events);
    const timezoneFiltered = removePastEvents(timezonedEvents);
    expect(filtered).toEqual([events[0]]);
    // TODO: uncomment below when browser inconsistencies with `createDateObject()`
    // comparisons is resolved
    // expect(timezoneFiltered).toEqual(timezonedEvents);
});
