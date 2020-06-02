export const simplifyTwitchResponse = video => {
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
