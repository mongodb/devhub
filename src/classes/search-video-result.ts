import { SearchResult } from './base/search-results';

export class SearchVideoResult extends SearchResult {
    thumbnailUrl: string;
    
    constructor(video) {
        super(video)
        this.thumbnailUrl = video.atf_image;
    }
}
