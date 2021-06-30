import { YoutubeResponse } from '../interfaces/responses/youtube-response';
import { YoutubeVideo } from '../classes/youtube-video';

export const transformYoutubeResponse = (
    responseData: YoutubeResponse
): YoutubeVideo => new YoutubeVideo(responseData);
