import dlv from 'dlv';
import { featuredArticles } from '../../queries/featured-articles';
import { transformArticleStrapiData } from '../transform-article-strapi-data';

const STRAPI_COMPONENT_TYPE = 'article-info.strapi-article';

const mapFeaturedArticle = article =>
    article.strapi_component === STRAPI_COMPONENT_TYPE
        ? article.article
            ? transformArticleStrapiData(article.article).slug
            : null
        : article.slug;

export const getFeaturedArticlesFromGraphql = async graphql => {
    const data = await graphql(featuredArticles);
    const homePageFeaturedArticles = dlv(
        data,
        'data.strapiHomePageFeaturedArticles.articles',
        []
        // This isn't quite polymorphic, since for Strapi a slug by default excludes the
        // type since it is redundant with the type field
        // The case is snooty first and then Strapi second
    )
        .map(mapFeaturedArticle)
        .filter(a => !!a);

    const learnPageFeaturedArticles = dlv(
        data,
        'data.strapiLearnPageFeaturedArticles.articles',
        []
        // This isn't quite polymorphic, since for Strapi a slug by default excludes the
        // type since it is redundant with the type field
        // The case is snooty first and then Strapi second
    )
        .map(mapFeaturedArticle)
        .filter(a => !!a);
    return { homePageFeaturedArticles, learnPageFeaturedArticles };
};
