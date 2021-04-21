import { ArticleCategory } from '../types/article-category';
import { ArticleSEO } from '../types/article-seo';

export interface Article {
    authors: object[];
    contentAST: object[];
    description: String;
    image: String;
    languages: object[];
    products: object[];
    publishedDate: String;
    related: object[];
    SEO: ArticleSEO;
    slug: String;
    tags: object[];
    title: String;
    type: ArticleCategory;
    updatedDate?: String;
}
