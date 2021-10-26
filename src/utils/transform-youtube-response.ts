import { VideoResponse } from '../interfaces/responses/video-response';
import { YoutubeVideo } from '../classes/youtube-video';

export const transformYoutubeResponse = (
    video: VideoResponse
): YoutubeVideo => new YoutubeVideo(video);