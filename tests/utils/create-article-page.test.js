import { createArticlePage } from '../../src/utils/setup/create-article-page';

describe('creating an article page', () => {
    const articleOneSlug = '/article1';
    const slugContentMapping = {
        [articleOneSlug]: { ast: { options: { template: 'devhub-article' } } },
    };
    const articleOne = { slug: articleOneSlug, related: [] };
    let createPage;
    beforeEach(() => {
        // Reset mock fn each time to check calls in isolation
        createPage = jest.fn();
    });

    it('should create a page at the correct slug', () => {
        createArticlePage(articleOne, slugContentMapping, {}, {}, createPage);
        expect(createPage.mock.calls.length).toBe(1);
        expect(createPage.mock.calls[0][0].path).toBe(articleOneSlug);
    });

    it('should properly tag series for a page', () => {
        const series = {
            seriesWithArticleOne: [articleOneSlug],
            seriesWithoutArticleOne: [],
        };
        createArticlePage(
            articleOne,
            slugContentMapping,
            series,
            {},
            createPage
        );
        expect(createPage.mock.calls.length).toBe(1);
        expect(
            createPage.mock.calls[0][0].context.seriesArticles
        ).toHaveProperty('seriesWithArticleOne');
        expect(
            createPage.mock.calls[0][0].context.seriesArticles
        ).not.toHaveProperty('seriesWithoutArticleOne');
        expect(
            createPage.mock.calls[0][0].context.seriesArticles
                .seriesWithArticleOne
        ).toStrictEqual(series.seriesWithArticleOne);
    });

    it('should get the correct template for a page', () => {
        slugContentMapping[articleOneSlug].ast = {
            options: {
                // "devhub-article" is a keyword to choose a specific article template
                template: 'devhub-article',
            },
        };
        createArticlePage(articleOne, slugContentMapping, {}, {}, createPage);
        expect(createPage.mock.calls[0][0].component).toContain('article.js');
    });

    it('should properly get related pages for a page', () => {
        const articleTwoSlug = '/article2';
        slugContentMapping[articleTwoSlug] = {
            ast: {},
        };
        articleOne.related = [{ refuri: articleTwoSlug }];
        createArticlePage(articleOne, slugContentMapping, {}, {}, createPage);
        expect(createPage.mock.calls[0][0].context.article.related.length).toBe(
            1
        );
        expect(
            createPage.mock.calls[0][0].context.article.related[0].target
        ).toBe(articleTwoSlug);
    });
});
