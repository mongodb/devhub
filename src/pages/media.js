import React from 'react';
import Layout from '../components/dev-hub/layout';
import fetchYoutubeData from '../utils/fetch-youtube-data';

const YT_PLAYLIST_ID = 'PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3';

const getVideos = async () => {
    const videos = await fetchYoutubeData(YT_PLAYLIST_ID);
    return videos;
};

const YoutubeVideo = ({ videoID }) => (
    <iframe
        src="http://www.youtube.com/embed/${videoID}"
        width="560"
        height="315"
        frameBorder="0"
        allowFullScreen
    ></iframe>
);

export default () => {
    const videos = getVideos();
    return <Layout>{<YoutubeVideo videoID={videos[0]} />}</Layout>;
};
