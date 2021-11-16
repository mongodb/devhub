import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { transformTwitchResponse } from '../transform-twitch-response';
import { transformYoutubeResponse } from '../transform-youtube-response';
import { transformPodcastResponse } from '../transform-podcast-response';
import memoizerific from 'memoizerific';
import axios from 'axios';

const fetchMedia = async () => {
    const strapiUrl = process.env.STRAPI_URL;
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [
        strapiYoutubeVideos,
        strapiTwitchVideos,
        strapiPodcasts,
        strapiPodcastSeries,
        strapiVideoSeries,
    ] = await Promise.all([
        client.callFunction('fetchYoutubeDataFromStrapi', [strapiUrl]),
        client.callFunction('fetchTwitchDataFromStrapi', [strapiUrl]),
        client.callFunction('fetchPodcastsDataFromStrapi', [strapiUrl]),
        client.callFunction('fetchPodcastsSeriesDataFromStrapi', [strapiUrl]),
        client.callFunction('fetchVideoSeriesDataFromStrapi', [strapiUrl]),
    ]);
    const allYoutubeVideos = strapiYoutubeVideos.map(transformYoutubeResponse);
    const allTwitchVideos = strapiTwitchVideos.map(transformTwitchResponse);
    const allPodcasts = strapiPodcasts.map(transformPodcastResponse);
    return {
        allVideos: [allYoutubeVideos, allTwitchVideos].flat(),
        allPodcasts: allPodcasts,
        fallbackTwitchVideo: allTwitchVideos[0],
        podcastSeries: strapiPodcastSeries,
        videoSeries: strapiVideoSeries,
    };
};

export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchMedia()
);
