import { YoutubeResponse } from '../interfaces/responses/youtube-response';
import { YoutubeVideo } from '../classes/youtube-video';

export const simplifyYoutubeResponse = (
    responseData: YoutubeResponse
): YoutubeVideo => {
    const video = responseData.snippet;
    // Video publish date is stored in "contentDetails", publish date in "snippet"
    // is for when this video was added to the playlist

    const publishedDate = responseData.contentDetails?.videoPublishedAt;
    return new YoutubeVideo(video, publishedDate);
};
