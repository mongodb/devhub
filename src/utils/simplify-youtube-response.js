import dlv from 'dlv';

export const simplifyYoutubeResponse = responseData => {
    const video = responseData.snippet;
    const youtubeJSON = {
        mediaType: 'youtube',
        title: video['title'],
        publishDate: video['publishedAt'],
        description: video['description'],
        videoId: dlv(video, 'resourceId.videoId', []),
        playlistId: video['playlistId'],
        thumbnailUrl: dlv(video, 'thumbnails.standard.url', []),
    };

    return youtubeJSON;
};
