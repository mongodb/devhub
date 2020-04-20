const {
    removeExcludedArticles,
} = require('../../src/utils/setup/remove-excluded-articles');

it('should remove specific articles from an array of all articles', () => {
    const includedArticleSlug = '/included';
    const excludedArticleSlug = '/excluded';
    const allArticles = [
        { query_fields: { slug: includedArticleSlug } },
        { query_fields: { slug: excludedArticleSlug } },
    ];
    const articlesToExclude = [];

    expect(
        removeExcludedArticles(allArticles, articlesToExclude)
    ).toStrictEqual(allArticles);

    articlesToExclude.push(excludedArticleSlug);
    expect(
        removeExcludedArticles(allArticles, articlesToExclude)
    ).toStrictEqual([{ query_fields: { slug: includedArticleSlug } }]);

    // Don't log this next warning out for this test
    const warn = console.warn;
    console.warn = jest.fn();
    expect(
        removeExcludedArticles(allArticles, ['/include/exclude'])
    ).toStrictEqual(allArticles);

    console.warn = warn;
});
