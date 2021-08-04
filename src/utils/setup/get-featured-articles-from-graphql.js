import dlv from 'dlv';
import { featuredArticles } from '../../queries/featured-articles';

export const getFeaturedArticlesFromGraphql = async graphql => {
    const data = await graphql(featuredArticles);
    const homePageArticles = dlv(
        data,
        'data.strapiHomePageFeaturedArticles.articles',
        []
    ).map(a => a.slug || a.article.slug);
    console.log(homePageArticles);
};
