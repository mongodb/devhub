import { TwitchResponse } from '../interfaces/responses/twitch-response';
import { TwitchVideo } from '../classes/twitch-video';

export const transformTwitchResponse = (video: TwitchResponse): TwitchVideo =>
    new TwitchVideo(video);
