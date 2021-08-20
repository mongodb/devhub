/* 
  Strapi Article Series can be composed of a mix of Strapi and Snooty article
  references.
*/
import dlv from 'dlv';
import { ArticleSeries, SeriesArticle } from '../interfaces/article-series';
import { transformArticleStrapiData } from '../utils/transform-article-strapi-data';
import { isStrapiArticle } from '../utils/setup/is-strapi-article';

export class StrapiArticleSeries implements ArticleSeries {
    articles: SeriesArticle[];
    title: String;
    constructor(title, entries, snootyTitleMapping) {
        this.articles = entries
            .map(article => {
                if (!article) return null;
                const isStrapi = isStrapiArticle(article);
                // Strapi's API for articles is different from what Snooty provides
                return isStrapi
                    ? this.handleStrapiArticle(article.article)
                    : this.handleSnootyArticle(article, snootyTitleMapping);
            })
            // Remove nulls
            .filter(entry => !!entry);
        this.title = title;
    }

    handleSnootyArticle = (article, snootyTitleMapping) => {
        if (!article.slug) return null;
        return {
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
        };
    };

    handleStrapiArticle = article => {
        if (!article) return null;
        const { name, slug } = transformArticleStrapiData(article);
        return { slug, title: name };
    };
}
