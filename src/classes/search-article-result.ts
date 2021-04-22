import dlv from 'dlv';
import { Article } from '../interfaces/article';
import { ArticleCategory } from '../types/article-category';
import { ArticleSEO } from '../types/article-seo';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';

export class SearchArticleResult implements Article {
    _id: String;
    authors: object[];
    contentAST: object[];
    description: String;
    image: String;
    languages: object[];
    headingNodes: object[];
    products: object[];
    publishedDate: String;
    related: object[];
    SEO: ArticleSEO;
    slug: String;
    tags: object[];
    title: String;
    type: ArticleCategory;
    updatedDate: String;
    constructor(result) {
        this._id = result._id;
        this.authors = [];
        // Below is not passed from Realm
        this.contentAST = [];
        this.description = result.description;
        this.headingNodes = [];
        this.languages = mapTagTypeToUrl(result.languages, 'language');
        this.products = mapTagTypeToUrl(result.products, 'product');
        this.publishedDate = result.pubDate;
        // Below is not passed from Realm
        this.related = [];
        this.slug = result.slug;
        // We don't need below for cards
        //@ts-ignore
        this.SEO = {};
        this.image = result['atf-image'];
        this.title = dlv(result.title, [0, 'value'], result.slug);
        this.tags = mapTagTypeToUrl(result.tags, 'tag');
        this.type = result.type;
        // Below is not being passed currently from Realm
        this.updatedDate = result.updatedDate;
    }
}
