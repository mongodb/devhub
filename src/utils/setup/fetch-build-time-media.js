import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { transformTwitchResponse } from '../transform-twitch-response';
import { transformYoutubeResponse } from '../transform-youtube-response';
import { transformPodcastResponse } from '../transform-podcast-response';
import memoizerific from 'memoizerific';
import axios from 'axios';

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
        videoSeries: await getVideosSeriesMapping(),
    };
};

const getVideosSeriesMapping = async () => {
    // TODO replace with realm call
    const response = await axios.get('http://localhost:1337/video-series');
    const videoSeries = response.data;
    const mapping = videoSeries.map(videoSeriesItem =>
        getVideoToSeriesMapping(videoSeriesItem)
    );
    return mapping;
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

const getVideoToSeriesMapping = videoSeriesItem => {
    const videoItems = videoSeriesItem.seriesEntry.map(entry => {
        return { slug: entry.video.slug, title: entry.video.title };
    });
    return { articles: videoItems, title: videoSeriesItem.title };
};

export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchMedia()
);
