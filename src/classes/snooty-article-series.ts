/* 
  All Snooty Article Series only work for Snooty articles,
  so we can assume every article here is a SnootyArticle
*/
import dlv from 'dlv';
import { ArticleSeries, SeriesArticle } from '../interfaces/article-series';

export class SnootyArticleSeries implements ArticleSeries {
    articles: SeriesArticle[];
    title: String;
    constructor(title, slugs, slugTitleMapping) {
        const getMappedSeries = seriesSlugs => {
            if (!seriesSlugs || !seriesSlugs.length) return null;
            return seriesSlugs.map(slug => {
                const articleTitle = dlv(
                    slugTitleMapping,
                    [slug, 'query_fields', 'title', 0, 'value'],
                    slug
                );
                return {
                    slug,
                    title: articleTitle,
                };
            });
        };
        this.articles = getMappedSeries(slugs);
        this.title = title;
    }
}
