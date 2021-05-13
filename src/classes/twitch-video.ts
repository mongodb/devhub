import { TwitchResponse } from '../interfaces/responses/twitch-response';

export class TwitchVideo {
    description: string;
    mediaType: string;
    publishDate: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;

    constructor(video: TwitchResponse) {
        this.videoId = video.id;
        this.description = video.description;
        this.mediaType = 'twitch';
        this.publishDate = video.published_at;
        this.thumbnailUrl = video.thumbnail_url;
        this.title = video.title;
    }
}
