import { VideoType } from '../types/video-type';

export interface Video {
    description?: string;
    mediaType: VideoType;
    publishDate: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;
}
