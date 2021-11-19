import dlv from 'dlv';
import { Article } from '../interfaces/article';
import { ArticleCategory } from '../types/article-category';
import { ArticleSEO } from '../types/article-seo';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { withPrefix } from 'gatsby';
import { SearchResult } from './base/search-results';

const isInternalFile = file => /^\//.test(file);

export class SearchArticleResult extends SearchResult {
    image: String;
    
    constructor(article) {
        super(article)
        this.languages = mapTagTypeToUrl(article.languages, 'language');
        this.products = mapTagTypeToUrl(article.products, 'product');
        const image = article['atf-image'];
        this.image = isInternalFile(image) ? withPrefix(image) : image;
        this.tags = mapTagTypeToUrl(article.tags, 'tag');
    }
}
