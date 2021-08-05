import dlv from 'dlv';
import { articleSeries } from '../../queries/article-series';
import { StrapiArticleSeries } from '../../classes/strapi-article-series';

export const getStrapiArticleSeriesFromGraphql = async (
    graphql,
    slugContentMapping
) => {
    const allSeries = await graphql(articleSeries);
    const nodes = dlv(allSeries, 'data.allStrapiArticleSeries.nodes', []) || [];
    const result = nodes.map(
        ({ title, seriesEntry }) =>
            new StrapiArticleSeries(title, seriesEntry, slugContentMapping)
    );
    return result;
};
