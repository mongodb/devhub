import {ArticleCategory} from '../types/article-category';

export interface Article {
  authors: object[];
  contentAST: object[];
  image: String;
  languages: object[];
  products: object[];
  slug: String;
  tags: object[];
  title: String;
  type: ArticleCategory;
}
