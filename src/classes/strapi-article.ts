import { Article } from '../interfaces/article';
import { ArticleCategory } from '../types/article-category';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { ArticleSEO } from '../types/article-seo';
import { transformArticleStrapiData } from '../utils/transform-article-strapi-data';
import { StrapiAuthor } from './strapi-author';

const toISODate = date => date && new Date(date).toISOString().slice(0, 10);

export class StrapiArticle implements Article {
    _id: String;
    authors: object[];
    contentAST: object[];
    description: String;
    image: String;
    languages: object[];
    headingNodes: object[];
    products: object[];
    publishedDate: String;
    related = [];
    SEO: ArticleSEO;
    slug: String;
    tags: object[];
    title: String;
    type: ArticleCategory;
    updatedDate: String;
    constructor(article) {
        const mappedArticle = transformArticleStrapiData(article);
        this._id = mappedArticle.id;
        this.authors = mappedArticle.authors.map(
            author => new StrapiAuthor(author)
        );
        this.contentAST = [mappedArticle.contentAST];
        this.description = mappedArticle.description;
        this.headingNodes = [{}];
        this.image = mappedArticle.image;
        this.languages = mapTagTypeToUrl(
            mappedArticle.languages,
            'language',
            true
        );
        this.products = mapTagTypeToUrl(
            mappedArticle.products,
            'product',
            true
        );
        this.publishedDate = toISODate(mappedArticle.published_at);
        this.SEO = mappedArticle.SEO;
        this.slug = mappedArticle.slug;
        this.tags = mapTagTypeToUrl(mappedArticle.tags, 'tag', true);
        this.title = mappedArticle.name;
        this.type = mappedArticle.type;
        this.updatedDate = toISODate(mappedArticle.updatedAt);
    }
}
