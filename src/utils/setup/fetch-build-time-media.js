import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { parsePodcasts } from '../parse-podcasts';
import { transformTwitchResponse } from '../transform-twitch-response';
import { transformYoutubeResponse } from '../transform-youtube-response';
import memoizerific from 'memoizerific';

const fetchMedia = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [youtubeVideos, twitchVideos, lybsinPodcasts] = await Promise.all([
        client.callFunction('fetchYoutubeData', []),
        client.callFunction('fetchMDBTwitchVideos', []),
        client.callFunction('fetchLybsinPodcasts', []),
    ]);
    const allTwitchVideos = twitchVideos.data.map(transformTwitchResponse);
    return {
        allVideos: [
            youtubeVideos.items.map(transformYoutubeResponse),
            allTwitchVideos,
        ].flat(),
        allPodcasts: parsePodcasts(lybsinPodcasts),
        fallbackTwitchVideo: allTwitchVideos[0],
    };
};
export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchMedia()
);
