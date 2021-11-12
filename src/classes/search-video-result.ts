import dlv from 'dlv';
import { Video } from '~src/interfaces/video';
import { VideoType } from '~src/types/video-type';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';

export class SearchVideoResult implements Video {
    description?: string;
    mediaType: VideoType;
    publishDate: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;

    constructor(video) {
        this.description = video.description;
        this.mediaType = video.mediaType;
        this.publishDate = video.pubDate;
        this.thumbnailUrl = video.atf_image;
        this.title = dlv(video.title, [0, 'value'], video.slug);
        this.videoId = video._id;
        this.slug = `/videos/${this.mediaType}/${getTagPageUriComponent(this.title)}`;
    }
}