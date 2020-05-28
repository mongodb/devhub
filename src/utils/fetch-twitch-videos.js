const { requestMDBTwitchVideos } = require('./devhub-api-stitch');

// Fetches videos from twitch api

const simplifyResponse = video => {
    const twitchJSON = {
        mediaType: 'twitch',
        title: video['title'],
        publishDate: video['published_at'],
        description: video['description'],
        thumbnailUrl: video['thumbnail_url'],
        videoId: video['id'],
    };

    return twitchJSON;
};

const fetchTwitchVideos = async videoLimit => {
    try {
        const videoResp = await requestMDBTwitchVideos(videoLimit);
        const videoList = videoResp.data.map(simplifyResponse);
        // return the whole array of videos, but ignore pagination for now
        return videoList;
    } catch (error) {
        console.error(error);
    }

    return [];
};

module.exports = fetchTwitchVideos;
