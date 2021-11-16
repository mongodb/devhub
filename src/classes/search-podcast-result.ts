import dlv from 'dlv';
import { Podcast } from "../interfaces/podcast"
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';

export class SearchPodcastResult implements Podcast {
    description: string;
    mediaType: string;
    publishDate: string;
    rawDescription?: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    _id: string;

    constructor(podcast) {
        this.description = podcast.description;
        this.mediaType = podcast.mediaType;
        this.publishDate = podcast.pubDate;
        this.slug = podcast.slug;
        this.thumbnailUrl = podcast.atf_image;
        this.title = dlv(podcast.title, [0, 'value'], podcast.slug);
        this._id = podcast._id
    }
}