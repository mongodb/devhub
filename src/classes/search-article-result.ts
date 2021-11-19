import { withPrefix } from 'gatsby';
import { SearchResult } from './base/search-results';

const isInternalFile = file => /^\//.test(file);

export class SearchArticleResult extends SearchResult {
    image: String;
    
    constructor(article) {
        super(article)
        const image = article['atf-image'];
        this.image = isInternalFile(image) ? withPrefix(image) : image;
    }
}
