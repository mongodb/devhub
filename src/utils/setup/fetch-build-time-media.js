import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { parsePodcasts } from '../parse-podcasts';
import { simplifyTwitchResponse } from '../simplify-twitch-response';
import { simplifyYoutubeResponse } from '../simplify-youtube-response';

const MAX_RESULTS = 5;

export const fetchBuildTimeMedia = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [youtubeVideos, twitchVideos, lybsinPodcasts] = await Promise.all([
        client.callFunction('fetchYoutubeData', [MAX_RESULTS]),
        client.callFunction('fetchMDBTwitchVideos', [MAX_RESULTS]),
        client.callFunction('fetchLybsinPodcasts', []),
    ]);
    return {
        allVideos: [
            youtubeVideos.items.map(simplifyYoutubeResponse),
            twitchVideos.data.map(simplifyTwitchResponse),
        ].flat(),
        allPodcasts: parsePodcasts(lybsinPodcasts),
    };
};
