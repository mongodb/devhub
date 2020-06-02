import { findArticlesFromSlugs } from '../../src/utils/setup/handle-create-page';

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
        query_fields: {
            slug,
        },
    }));

    let foundSlugs = findArticlesFromSlugs(
        allArticles,
        requestedFeaturedSlugs
    ).map(a => a.query_fields.slug);

    const expectedArticleSlugsFound = [
        allArticles[3].query_fields.slug,
        allArticles[1].query_fields.slug,
        allArticles[2].query_fields.slug,
    ];

    // All articles were found, so we should get them back in order
    expect(foundSlugs).toStrictEqual(expectedArticleSlugsFound);

    requestedFeaturedSlugs = [
        '/quickstart',
        '/how-to',
        '/how-to/polymorphic-pattern',
    ];

    foundSlugs = findArticlesFromSlugs(allArticles, requestedFeaturedSlugs).map(
        a => a.query_fields.slug
    );

    // The first two were not found, so return the 0th and 1st elements (instead of null)
    expect(foundSlugs).toStrictEqual([
        '/foo',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
    ]);

    const maxSize = 1;
    foundSlugs = findArticlesFromSlugs(
        allArticles,
        requestedFeaturedSlugs,
        maxSize
    ).map(a => a.query_fields.slug);

    // Since we only want a max of one, only consider the first slug to check
    expect(foundSlugs).toStrictEqual(['/foo']);
});
