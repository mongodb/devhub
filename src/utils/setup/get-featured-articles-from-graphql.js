import dlv from 'dlv';
import { featuredArticles } from '../../queries/featured-articles';
import { transformArticleStrapiData } from '../transform-article-strapi-data';

export const getFeaturedArticlesFromGraphql = async graphql => {
    const data = await graphql(featuredArticles);
    const homePageFeaturedArticles = dlv(
        data,
        'data.strapiHomePageFeaturedArticles.articles',
        []
    ).map(a => a.slug || transformArticleStrapiData(a.article).slug);

    const learnPageFeaturedArticles = dlv(
        data,
        'data.strapiLearnPageFeaturedArticles.articles',
        []
    ).map(a => a.slug || transformArticleStrapiData(a.article).slug);
    return { homePageFeaturedArticles, learnPageFeaturedArticles };
};
