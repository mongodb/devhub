import { findArticlesFromSlugs } from '../../src/utils/setup/on-create-page';

it('should correctly find featured articles given a set of requested articles', () => {
    let requestedFeaturedSlugs = [
        '/quickstart/java-setup-crud-operations',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
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

    let result = findArticlesFromSlugs(allArticles, requestedFeaturedSlugs).map(
        a => a.query_fields.slug
    );

    // All articles were found, so we should get them back in order
    expect(result).toStrictEqual(requestedFeaturedSlugs);

    requestedFeaturedSlugs = [
        '/quickstart',
        '/how-to',
        '/how-to/polymorphic-pattern',
    ];

    result = findArticlesFromSlugs(allArticles, requestedFeaturedSlugs).map(
        a => a.query_fields.slug
    );

    // The first two were not found, so return the 0th and 1st elements (instead of null)
    expect(result).toStrictEqual([
        '/foo',
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
    ]);
});
