import {SearchResult} from './base/search-results'


export class SearchPodcastResult extends SearchResult {
    thumbnailUrl: string;

    constructor(podcast) {
        super(podcast)
        this.thumbnailUrl = podcast.atf_image;
        this.description = podcast.description.replace(/<[^>]+>/g, '');
    }
}
