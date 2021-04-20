import {Article} from '../interfaces/article';

export class SnootyArticle implements Article {
  slug: String;
  constructor(article) {
    this.slug = article.slug;
  }
}
