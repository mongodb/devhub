export const EVENTS_URL =
    'https://www.mongodb.com/api/event/all/1?sort=-node_type_attributes.event_start';

export const removePastEvents = events => {
    const today = new Date();
    return events.filter(
        e =>
            new Date(e.node_type_attributes.event_end) >= today &&
            e.status === 'published'
    );
};

// Fetches data from mongodb.com/events api
const fetchEventData = async () => {
    const data = await fetch(EVENTS_URL, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (data) {
        const parsedData = await data.json();
        const upcomingEvents = removePastEvents(parsedData);
        return upcomingEvents;
    }
    return [];
};

export default fetchEventData;
