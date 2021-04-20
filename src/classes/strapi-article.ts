import {Article} from '../interfaces/article';
import {transformArticleStrapiData} from '../utils/transform-article-strapi-data';
import {ArticleCategory} from '../types/article-category';

export class StrapiArticle implements Article {
  authors: object[];
  contentAST: object[];
  image: String;
  languages: object[];
  products: object[];
  SEO: object;
  slug: String;
  tags: object[];
  title: String;
  type: ArticleCategory;
  constructor(article) {
    const mappedArticle = transformArticleStrapiData(article);
    this.authors = mappedArticle.authors;
    this.contentAST = mappedArticle.contentAST;
    this.slug = mappedArticle.slug;
    this.SEO = mappedArticle.SEO;
    this.image = mappedArticle.image;
    this.languages = mappedArticle.languages;
    this.products = mappedArticle.products;
    this.tags = mappedArticle.tags
    this.title = mappedArticle.name;
    this.type = mappedArticle.type;
  }
}
