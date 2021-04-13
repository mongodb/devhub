import dlv from 'dlv';

export const simplifyYoutubeResponse = responseData => {
    const video = responseData.snippet;
    // Video publish date is stored in "contentDetails", publish date in "snippet"
    // is for when this video was added to the playlist
    const publishedDate = dlv(
        responseData,
        'contentDetails.videoPublishedAt',
        null
    );
    const youtubeJSON = {
        mediaType: 'youtube',
        title: video['title'],
        publishDate: publishedDate,
        description: video['description'],
        videoId: dlv(video, 'resourceId.videoId', []),
        playlistId: video['playlistId'],
        thumbnailUrl: dlv(video, 'thumbnails.standard.url', []),
    };

    return youtubeJSON;
};
