import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { simplifyTwitchResponse } from '../simplify-twitch-response';
import { simplifyYoutubeResponse } from '../simplify-youtube-response';

const MAX_RESULTS = 5;

export const fetchBuildTimeVideos = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [youtubeVideos, twitchVideos] = await Promise.all([
        client.callFunction('fetchYoutubeData', [MAX_RESULTS]),
        client.callFunction('fetchMDBTwitchVideos', [MAX_RESULTS]),
    ]);
    return [
        youtubeVideos.items.map(simplifyYoutubeResponse),
        twitchVideos.data.map(simplifyTwitchResponse),
    ].flat();
};
