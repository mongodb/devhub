import { TwitchResponse } from '../interfaces/responses/twitch-response';
import { Video } from '~src/interfaces/video';
import { VideoType } from '~src/types/video-type';

export class TwitchVideo implements Video {
    description?: string;
    mediaType: VideoType;
    publishDate: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;

    constructor(video: TwitchResponse) {
        this.description = video.description;
        this.mediaType = 'twitch';
        this.publishDate = video.published_at;
        this.thumbnailUrl = video.thumbnail_url;
        this.title = video.title;
        this.videoId = video.id;
    }
}
