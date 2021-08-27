import { RuntimeError } from '../classes/runtime-error';

const EVENTS_API_URL =
    'https://www.mongodb.com/api/event/all/1?sort=-node_type_attributes.event_start';
const EVENTS_BASE_URL = 'http://www.mongodb.com/';

export const removePastEvents = events => {
    const today = new Date();
    return events.filter(
        e =>
            new Date(e.node_type_attributes.event_end) >= today &&
            e.status === 'published'
    );
};

// Some events coming from the .com API are relative links to events, so we must
// convert these to absolute links
const addUrlIfLocal = event => {
    const url = event.url;
    if (url.match(/^(http|www)/)) {
        return event;
    }
    return { ...event, url: `${EVENTS_BASE_URL}${url}` };
};

// Fetches data from mongodb.com/events api
const fetchEventData = async () => {
    try {
        const data = await fetch(EVENTS_API_URL, {
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data) {
            const parsedData = await data.json();
            const upcomingEvents = removePastEvents(parsedData);
            const eventsWithUpdatedUrls = upcomingEvents.map(addUrlIfLocal);
            return eventsWithUpdatedUrls;
        }
    } catch (e) {
        new RuntimeError(e);
    }
    return [];
};

export default fetchEventData;
