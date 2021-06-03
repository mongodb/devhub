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

            let hasSeenActiveSlug = false;
            const getSeriesArticlePosition = articleTitle => {
                // Find if an article is the current one in the series, or is upcoming/past
                if (hasSeenActiveSlug) {
                    return 'upcoming';
                } else if (articleTitle === title) {
                    hasSeenActiveSlug = true;
                    return 'active';
                }
                return 'past';
            };

            const mappedSeries = seriesSlugs.map(slug => {
                const title = dlv(slugTitleMapping, [slug, 0, 'value'], slug);
                const position = getSeriesArticlePosition(title);
                return {
                    position,
                    slug,
                    title,
                };
            });
            return mappedSeries;
        };
        this.articles = getMappedSeries(slugs);
        console.log(this.articles);
        this.title = title;
    }
}
