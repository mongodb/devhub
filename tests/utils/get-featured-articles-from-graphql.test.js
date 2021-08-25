import { getFeaturedArticlesFromGraphql } from '../../src/utils/setup/get-featured-articles-from-graphql';

it('should correctly parse incoming articles from graphql', async () => {
    const graphql = jest.fn(async () => ({
        data: {
            strapiHomePageFeaturedArticles: { articles: [] },
            StrapiLearnPageFeaturedArticles: { articles: [] },
        },
    }));
    const emptyResponse = await getFeaturedArticlesFromGraphql(graphql);
    expect(emptyResponse.homePageFeaturedArticles).toStrictEqual([]);
    expect(emptyResponse.learnPageFeaturedArticles).toStrictEqual([]);
});
