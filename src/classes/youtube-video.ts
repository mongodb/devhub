import { Video } from '../interfaces/video';
import { YoutubeResponse } from '../interfaces/responses/youtube-response';
import { VideoType } from '../types/video-type';

export class YoutubeVideo implements Video {
    description: string;
    mediaType: VideoType;
    publishDate: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;

    constructor({ snippet: video, contentDetails }: YoutubeResponse) {
        this.description = video.description;
        this.mediaType = 'youtube';
        this.publishDate = contentDetails?.videoPublishedAt;
        this.thumbnailUrl = video.thumbnails?.standard?.url;
        this.title = video.title;
        this.videoId = video.resourceId?.videoId;
    }
}
