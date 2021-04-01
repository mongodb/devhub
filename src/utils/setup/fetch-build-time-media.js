import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { parsePodcasts } from '../parse-podcasts';
import { simplifyTwitchResponse } from '../simplify-twitch-response';
import { simplifyYoutubeResponse } from '../simplify-youtube-response';
import memoizerific from 'memoizerific';

const MAX_RESULTS = 5;

const fetchContent = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [youtubeVideos, twitchVideos, lybsinPodcasts] = await Promise.all([
        client.callFunction('fetchYoutubeData', [MAX_RESULTS]),
        client.callFunction('fetchMDBTwitchVideos', [MAX_RESULTS]),
        client.callFunction('fetchLybsinPodcasts', []),
    ]);
    const allTwitchVideos = twitchVideos.data.map(simplifyTwitchResponse);
    return {
        allVideos: [
            youtubeVideos.items.map(simplifyYoutubeResponse),
            allTwitchVideos,
        ].flat(),
        allPodcasts: parsePodcasts(lybsinPodcasts),
        fallbackTwitchVideo: allTwitchVideos[0],
    };
};

export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchContent()
);
