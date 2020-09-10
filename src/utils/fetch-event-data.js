import { requestEvents } from './devhub-api-stitch';

// Fetches data from mongodb.com/events api
const fetchEventData = async () => {
    try {
        const events = await requestEvents();
        return events;
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchEventData;
