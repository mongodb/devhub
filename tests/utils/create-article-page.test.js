import { createArticlePage } from '../../src/utils/setup/create-article-page';

describe('creating an article page', () => {
    const articleOneSlug = '/article1';
    const slugContentMapping = {
        [articleOneSlug]: { ast: {} },
    };
    let createPage;
    beforeEach(() => {
        // Reset mock fn each time to check calls in isolation
        createPage = jest.fn();
    });

    it('should create a page at the correct slug', () => {
        createArticlePage(
            articleOneSlug,
            slugContentMapping,
            {},
            {},
            createPage
        );
        expect(createPage.mock.calls.length).toBe(1);
        expect(createPage.mock.calls[0][0].path).toBe(articleOneSlug);
    });

    it('should properly tag series for a page', () => {
        const series = {
            seriesWithArticleOne: [articleOneSlug],
            seriesWithoutArticleOne: [],
        };
        createArticlePage(
            articleOneSlug,
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
        createArticlePage(
            articleOneSlug,
            slugContentMapping,
            {},
            {},
            createPage
        );
        expect(createPage.mock.calls[0][0].component).toContain('article.js');
    });

    it('should properly get related pages for a page', () => {
        const articleTwoSlug = '/article2';
        slugContentMapping[articleTwoSlug] = {
            ast: {},
        };
        slugContentMapping[articleOneSlug].query_fields = {
            related: [{ refuri: articleTwoSlug }],
        };
        createArticlePage(
            articleOneSlug,
            slugContentMapping,
            {},
            {},
            createPage
        );
        expect(
            createPage.mock.calls[0][0].context.__refDocMapping.query_fields
                .related.length
        ).toBe(1);
        expect(
            createPage.mock.calls[0][0].context.__refDocMapping.query_fields
                .related[0].target
        ).toBe(articleTwoSlug);
    });
});
