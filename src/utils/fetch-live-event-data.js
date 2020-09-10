import { requestLiveEvents } from './devhub-api-stitch';

// Fetches data from live.mongodb.com events api
const fetchLiveEventData = async () => {
    try {
        const liveEvents = await requestLiveEvents();
        return liveEvents;
    } catch (e) {
        console.error(e);
    }

    return [];
};

export default fetchLiveEventData;
