import { Video } from '../interfaces/video';
import { Snippet } from '../interfaces/responses/youtube-response';
import { VideoType } from '../types/video-type';

export class YoutubeVideo implements Video {
    description: string;
    mediaType: VideoType;
    playlistId: string;
    publishDate: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;

    constructor(video: Snippet, publishedDate: string) {
        this.description = video.description;
        this.mediaType = 'youtube';
        this.playlistId = video.playlistId;
        this.publishDate = publishedDate;
        this.thumbnailUrl = video.thumbnails?.standard?.url;
        this.title = video.title;
        this.videoId = video.resourceId?.videoId;
    }
}
