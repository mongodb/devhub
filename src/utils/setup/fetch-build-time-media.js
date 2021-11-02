import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { transformTwitchResponse } from '../transform-twitch-response';
import { transformYoutubeResponse } from '../transform-youtube-response';
import { transformPodcastResponse } from '../transform-podcast-response';
import memoizerific from 'memoizerific';

const fetchMedia = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [
        strapiYoutubeVideos,
        strapiTwitchVideos,
        strapiPodcasts,
        strapiPodcastSeries,
    ] = await Promise.all([
        client.callFunction('fetchYoutubeDataFromStrapi', []),
        client.callFunction('fetchTwitchDataFromStrapi', []),
        client.callFunction('fetchPodcastsDataFromStrapi', []),
        client.callFunction('fetchPodcastsSeriesDataFromStrapi', []),
    ]);
    const allYoutubeVideos = strapiYoutubeVideos.map(transformYoutubeResponse);
    const allTwitchVideos = strapiTwitchVideos.map(transformTwitchResponse);
    const allPodcasts = strapiPodcasts.map(transformPodcastResponse);
    return {
        allVideos: [allYoutubeVideos, allTwitchVideos].flat(),
        allPodcasts: allPodcasts,
        fallbackTwitchVideo: allTwitchVideos[0],
        podcastSeries: getPodcastsSeriesMapping(strapiPodcastSeries),
    };
};

const getPodcastsSeriesMapping = podcastSeries => {
    const mapping = podcastSeries.map(podcastSeriesItem =>
        getPodcastToSeriesMapping(podcastSeriesItem)
    );
    return mapping;
};

const getPodcastToSeriesMapping = podcastSeriesItem => {
    const podcastItems = podcastSeriesItem.seriesEntry.map(entry => {
        return { slug: entry.podcast.slug, title: entry.podcast.title };
    });
    return { articles: podcastItems, title: podcastSeriesItem.title };
};

export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchMedia()
);
