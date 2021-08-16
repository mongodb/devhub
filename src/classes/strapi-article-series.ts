/* 
  Strapi Article Series can be composed of a mix of Strapi and Snooty article
  references.
*/
import dlv from 'dlv';
import { ArticleSeries, SeriesArticle } from '../interfaces/article-series';
import { transformArticleStrapiData } from '../utils/transform-article-strapi-data';

export class StrapiArticleSeries implements ArticleSeries {
    articles: SeriesArticle[];
    title: String;
    constructor(title, entries, snootyTitleMapping) {
        this.articles = entries.map(article => {
            const isStrapi = !!article.article;
            // Strapi's API for articles is different from what Snooty provides
            return isStrapi
                ? this.handleStrapiArticle(article.article)
                : this.handleSnootyArticle(article, snootyTitleMapping);
        });
        this.title = title;
    }

    handleSnootyArticle = (article, snootyTitleMapping) => ({
        slug: article.slug,
        title: dlv(
            snootyTitleMapping,
            [
                // Remove any leading/trailing slashes for use with Snooty's provided mapping
                article.slug.replace(/^\/|\/$/g, ''),
                'query_fields',
                'title',
                0,
                'value',
            ],
            article.slug
        ),
    });

    handleStrapiArticle = article => {
        const { name, slug } = transformArticleStrapiData(article);
        return { slug, title: name };
    };
}
