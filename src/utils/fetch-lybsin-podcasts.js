import { requestLybsinPodcasts } from './devhub-api-stitch';
import { parsePodcasts } from './parse-podcasts';
import { BuildError } from '../classes/build-error';
// Fetches and parses podcast info from https://mongodb.libsyn.com/rss

const fetchLybsinPodcasts = async () => {
    try {
        const response = await requestLybsinPodcasts();
        if (response) {
            const podcastList = parsePodcasts(response);
            return podcastList;
        }
    } catch (e) {
        new BuildError(e);
    }
    return [];
};

export default fetchLybsinPodcasts;
