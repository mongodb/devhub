import dlv from 'dlv';
import { requestYoutubePlaylist } from './devhub-api-stitch';
// Fetches data from youtube api

const simplifyResponse = responseData => {
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

const fetchYoutubeData = async (maxResults = 5) => {
    try {
        const response = await requestYoutubePlaylist(maxResults);
        if (response) {
            const videoList = response.items.map(simplifyResponse);
            return videoList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchYoutubeData;
