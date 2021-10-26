import { Video } from '../interfaces/video';
import { VideoResponse } from '../interfaces/responses/video-response';
import { VideoType } from '../types/video-type';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';

export class YoutubeVideo implements Video {
    description: string;
    mediaType: VideoType;
    publishDate: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;
    SEO: object;
    tags: object[];
    products: object[];
    languages: object[];

    constructor(video: VideoResponse) {
        this.description = video.description;
        this.mediaType = 'youtube';
        this.publishDate = video.originalPublishDate;
        this.slug = video.slug;
        this.thumbnailUrl = video.thumbnailUrl;
        this.title = video.title;
        this.videoId = video.videoId;
        this.SEO = video.SEO;
        this.tags = video.tags;
        this.products = video.products;
        this.languages = video.languages;

    }
}
