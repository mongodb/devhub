import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { parsePodcasts } from '../parse-podcasts';
import { transformTwitchResponse } from '../transform-twitch-response';
import { transformYoutubeResponse } from '../transform-youtube-response';
import memoizerific from 'memoizerific';

const fetchMedia = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [youtubeVideos, twitchVideos, strapiPodcasts] = await Promise.all([
        client.callFunction('fetchYoutubeData', []),
        client.callFunction('fetchMDBTwitchVideos', []),
        client.callFunction('fetchStrapiPodcasts'),
    ]);
    const [podcastSeriesMapping] = await Promise.all([
        client.callFunction('fetchPodcastSeriesMapping'),
    ]);

    const allTwitchVideos = twitchVideos.data.map(transformTwitchResponse);
    return {
        allVideos: [
            youtubeVideos.items.map(transformYoutubeResponse),
            allTwitchVideos,
        ].flat(),
        allPodcasts: parsePodcasts(strapiPodcasts),
        fallbackTwitchVideo: allTwitchVideos[0],
        podcastSeries: podcastSeriesMapping,
    };
};
export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchMedia()
);
