import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';
import { parsePodcasts } from '../parse-podcasts';
import { transformTwitchResponse } from '../transform-twitch-response';
import { transformYoutubeResponse } from '../transform-youtube-response';
import memoizerific from 'memoizerific';
import axios from 'axios';

const fetchMedia = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const [strapiYoutubeVideos, strapiTwitchVideos, strapiPodcasts] =
        await Promise.all([
            getYoutubeVideosFromStrapi(),
            getTwitchVideosFromStrapi(),
            getPodcastsFromStrapi(),
        ]);

    const allYoutubeVideos = strapiYoutubeVideos.map(transformYoutubeResponse);
    const allTwitchVideos = strapiTwitchVideos.map(transformTwitchResponse);

    return {
        allVideos: [allYoutubeVideos, allTwitchVideos].flat(),
        allPodcasts: parsePodcasts(strapiPodcasts),
        fallbackTwitchVideo: allTwitchVideos[0],
        podcastSeries: await getPodcastsSeriesMapping(),
    };
};

const getPodcastsSeriesMapping = async () => {
    // TODO replace with realm call
    const response = await axios.get('http://localhost:1337/podcast-series');
    const podcastSeries = response.data;
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

const getPodcastsFromStrapi = async () => {
    // TODO replace with realm call
    const response = await axios.get('http://localhost:1337/podcasts');
    return response.data;
};

const getYoutubeVideosFromStrapi = async () => {
    // TODO replace with realm call
    const response = await axios.get('http://localhost:1337/videos');
    return response.data.filter(d => d.mediaType === 'Youtube');
};

const getTwitchVideosFromStrapi = async () => {
    // TODO replace with realm call
    const response = await axios.get('http://localhost:1337/videos');
    return response.data.filter(d => d.mediaType === 'Twitch');
};

export const fetchBuildTimeMedia = memoizerific(1)(
    async () => await fetchMedia()
);
