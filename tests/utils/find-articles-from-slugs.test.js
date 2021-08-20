import { findArticlesFromSlugs } from '../../src/utils/setup/find-articles-from-slugs';

it('should correctly find featured articles given a set of requested articles', () => {
    let requestedFeaturedSlugs = [
        'quickstart/java-setup-crud-operations',
        'how-to/golang-alexa-skills',
        'how-to/polymorphic-pattern',
    ];

    const allArticles = [
        '/foo',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
        '/quickstart/java-setup-crud-operations',
        '/quickstart/csharp',
    ].map(slug => ({
        slug,
    }));

    let foundSlugs = findArticlesFromSlugs(
        allArticles,
        requestedFeaturedSlugs
    ).map(a => a.slug);

    const expectedArticleSlugsFound = [
        allArticles[3].slug,
        allArticles[1].slug,
        allArticles[2].slug,
    ];

    // All articles were found, so we should get them back in order
    expect(foundSlugs).toStrictEqual(expectedArticleSlugsFound);

    requestedFeaturedSlugs = [
        '/quickstart',
        '/how-to',
        '/how-to/polymorphic-pattern',
    ];

    foundSlugs = findArticlesFromSlugs(allArticles, requestedFeaturedSlugs).map(
        a => a.slug
    );

    // The first two were not found, so return the 0th and 1st elements (instead of null)
    expect(foundSlugs).toStrictEqual([
        '/foo',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
    ]);
});
