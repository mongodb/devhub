import { requestLybsinPodcasts } from './devhub-api-stitch';
import { parsePodcasts } from './parse-podcasts';

// Fetches and parses podcast info from https://mongodb.libsyn.com/rss

const fetchLybsinPodcasts = async () => {
    try {
        const response = await requestLybsinPodcasts();
        if (response) {
            const podcastList = parsePodcasts(response);
            return podcastList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchLybsinPodcasts;
