import { getFeaturedArticlesFromGraphql } from '../../src/utils/setup/get-featured-articles-from-graphql';

const snootyHomeSlug = 'snooty.home.slug';
const snootyHomeArticle = {
    strapi_component: 'article-info.snooty-article',
    slug: snootyHomeSlug,
};
const snootyLearnSlug = 'snooty.learn.slug';
const snootyLearnArticle = {
    strapi_component: 'article-info.snooty-article',
    slug: snootyLearnSlug,
};
const strapiArticleType = 'Article';
const strapiHomeSlug = '/strapi.home.slug';
const strapiHomeArticle = {
    strapi_component: 'article-info.strapi-article',
    article: {
        type: strapiArticleType,
        slug: strapiHomeSlug,
    },
};
const strapiLearnSlug = '/strapi.learn.slug';
const strapiLearnArticle = {
    strapi_component: 'article-info.strapi-article',
    article: {
        type: strapiArticleType,
        slug: strapiLearnSlug,
    },
};

it('should correctly parse incoming articles from graphql', async () => {
    let graphql = jest.fn(async () => ({
        data: {
            strapiHomePageFeaturedArticles: { articles: [] },
            StrapiLearnPageFeaturedArticles: { articles: [] },
        },
    }));
    const emptyResponse = await getFeaturedArticlesFromGraphql(graphql);
    expect(emptyResponse.homePageFeaturedArticles).toStrictEqual([]);
    expect(emptyResponse.learnPageFeaturedArticles).toStrictEqual([]);

    graphql = jest.fn(async () => ({
        data: {
            strapiHomePageFeaturedArticles: {
                articles: [snootyHomeArticle, strapiHomeArticle],
            },
            strapiLearnPageFeaturedArticles: {
                articles: [strapiLearnArticle, snootyLearnArticle],
            },
        },
    }));
    const fullResponse = await getFeaturedArticlesFromGraphql(graphql);
    expect(fullResponse.homePageFeaturedArticles).toStrictEqual([
        snootyHomeSlug,
        `article${strapiHomeSlug}`,
    ]);
    expect(fullResponse.learnPageFeaturedArticles).toStrictEqual([
        `article${strapiLearnSlug}`,
        snootyLearnSlug,
    ]);
});
