const {
    removeExcludedArticles,
} = require('../../src/utils/setup/remove-excluded-articles');

it('should remove specific articles from an array of all articles', () => {
    const includedArticleSlug = '/included';
    const excludedArticleSlug = '/excluded';
    const allArticles = [
        { slug: includedArticleSlug },
        { slug: excludedArticleSlug },
    ];
    const articlesToExclude = [];

    expect(
        removeExcludedArticles(allArticles, articlesToExclude)
    ).toStrictEqual(allArticles);

    articlesToExclude.push(excludedArticleSlug);
    expect(
        removeExcludedArticles(allArticles, articlesToExclude)
    ).toStrictEqual([{ slug: includedArticleSlug }]);

    // Don't log this next warning out for this test
    const warn = console.warn;
    console.warn = jest.fn();
    expect(
        removeExcludedArticles(allArticles, ['/include/exclude'])
    ).toStrictEqual(allArticles);

    console.warn = warn;
});
