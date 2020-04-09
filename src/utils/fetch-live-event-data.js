const API_KEY = '00411c8fd1b9c3224260259d245dd29890130b94';
const LIVE_EVENTS_URL = 'https://live.mongodb.com/api/event?status=Live';

// Fetches data from live.mongodb.com events api
const fetchLiveEventData = async () => {
    try {
        const data = await fetch(LIVE_EVENTS_URL, {
            headers: {
                Authorization: `Token ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        if (data) {
            const parsedData = await data.json();
            return parsedData.results.map(e => ({
                // mongodb.com events api returns relevant fields in `node_type_attributes`, our components are expecting this structure
                node_type_attributes: {
                    event_start: e.start_date,
                    event_end: e.end_date,
                    event_city: e.chapter.city,
                    event_country: e.chapter.country,
                },
                ...e,
            }));
        }
    } catch (e) {
        console.error(e);
    }

    return [];
};

export default fetchLiveEventData;
