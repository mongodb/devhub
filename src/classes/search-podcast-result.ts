import dlv from 'dlv';
import { IPodcast } from "../interfaces/podcast"
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { StrapiAuthor } from '../classes/strapi-author';
import { formatRelatedContent } from '../utils/format-related-content'
import {SearchResult} from './base/search-results'


export class SearchPodcastResult extends SearchResult {
    thumbnailUrl: string;

    constructor(podcast) {
        super(podcast)
        this.thumbnailUrl = podcast.atf_image;
        this.description = podcast.description.replace(/<[^>]+>/g, '');
    }
}
