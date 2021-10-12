import {
    findAndFillArticlesFromSlugs,
    findArticlesFromSlugs,
} from '../../src/utils/setup/find-and-fill-articles-from-slugs';

describe('Finding articles from slugs and auto-populate', () => {
    let requestedFeaturedSlugs;
    const allArticles = [
        '/how-to/golang-alexa-skills',
        '/how-to/polymorphic-pattern',
        '/foo',
        '/quickstart/java-setup-crud-operations',
        '/quickstart/csharp',
    ].map(slug => ({
        slug,
    }));

    beforeEach(() => {
        requestedFeaturedSlugs = [
            '/quickstart/java-setup-crud-operations',
            '/how-to/golang-alexa-skills',
            '/how-to/polymorphic-pattern',
        ];
    });

    it('should correctly find featured articles given a set of requested articles', () => {
        let foundSlugs = findArticlesFromSlugs(
            allArticles,
            requestedFeaturedSlugs
        ).map(a => a.slug);

        const expectedArticleSlugsFound = [
            allArticles[3].slug,
            allArticles[0].slug,
            allArticles[1].slug,
        ];

        // All articles were found, so we should get them back in order
        expect(foundSlugs).toStrictEqual(expectedArticleSlugsFound);

        requestedFeaturedSlugs = [
            '/quickstart',
            '/how-to',
            '/how-to/polymorphic-pattern',
        ];

        foundSlugs = findArticlesFromSlugs(
            allArticles,
            requestedFeaturedSlugs
        ).map(a => a.slug);

        // The first two were not found, so return the 0th and 1st elements (instead of null)
        expect(foundSlugs).toStrictEqual([
            '/how-to/golang-alexa-skills',
            '/foo',
            '/how-to/polymorphic-pattern',
        ]);
    });

    it('should ensure a desired length of articles is achieved', () => {
        let desiredLength = 3;

        // Should keep array as-is
        let returnedArticles = findAndFillArticlesFromSlugs(
            allArticles,
            requestedFeaturedSlugs,
            desiredLength,
            null
        ).map(a => a.slug);

        expect(returnedArticles).toStrictEqual(
            requestedFeaturedSlugs.slice(0, desiredLength)
        );

        // Should populate using the first 3 in all articles
        returnedArticles = findAndFillArticlesFromSlugs(
            allArticles,
            [],
            3,
            null
        ).map(a => a.slug);
        expect(returnedArticles).toStrictEqual(
            allArticles.slice(0, 3).map(a => a.slug)
        );

        desiredLength = 2;

        // Should cut off the last element in the array
        returnedArticles = findAndFillArticlesFromSlugs(
            allArticles,
            requestedFeaturedSlugs,
            desiredLength,
            null
        ).map(a => a.slug);

        expect(returnedArticles).toStrictEqual(
            requestedFeaturedSlugs.slice(0, desiredLength)
        );
    });

    it('should properly fill in missing articles where needed', () => {
        let desiredLength = 4;

        // One article is to be added, should pull from all but not repeat
        let returnedArticles = findAndFillArticlesFromSlugs(
            allArticles,
            requestedFeaturedSlugs,
            desiredLength,
            null
        ).map(a => a.slug);

        expect(returnedArticles).toStrictEqual([
            '/quickstart/java-setup-crud-operations',
            '/how-to/golang-alexa-skills',
            '/how-to/polymorphic-pattern',
            '/foo',
        ]);

        desiredLength = 3;

        // Should populate using the 3 in all articles in reverse alphabetical order
        returnedArticles = findAndFillArticlesFromSlugs(
            allArticles,
            [],
            3,
            (a, b) => b.slug.localeCompare(a.slug)
        ).map(a => a.slug);
        expect(returnedArticles).toStrictEqual([
            '/quickstart/java-setup-crud-operations',
            '/quickstart/csharp',
            '/how-to/polymorphic-pattern',
        ]);
    });
});
