import { VideoResponse } from '../interfaces/responses/video-response';
import { TwitchVideo } from '../classes/twitch-video';

export const transformTwitchResponse = (video : VideoResponse): TwitchVideo =>
    new TwitchVideo(video);
