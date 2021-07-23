import { removeDuplicatedArticles } from '../../src/utils/setup/remove-duplicated-articles';

describe('Remove duplicated articles from Snooty and Strapi', () => {
    let snootyArticles;
    let strapiArticles;
    let totalNumberOfArticles;
    const snootyType = 'snooty';
    const strapiType = 'strapi';
    beforeEach(() => {
        snootyArticles = [
            { slug: '/how-to/do-something', type: snootyType },
            { slug: '/quickstart/do-something', type: snootyType },
        ];
        strapiArticles = [{ slug: '/article/do-something', type: strapiType }];
        totalNumberOfArticles = snootyArticles.length + strapiArticles.length;
    });
    it('should keep all articles if slugs are unique', () => {
        const filteredArticles = removeDuplicatedArticles(
            snootyArticles,
            strapiArticles
        );
        expect(filteredArticles.length).toBe(totalNumberOfArticles);
    });
    it('should handle an empty case', () => {
        const filteredArticles = removeDuplicatedArticles([], []);
        expect(filteredArticles.length).toBe(0);
    });
    it('should remove an article from Snooty where a slug duped', () => {
        // Add a new Strapi article, modify our count
        strapiArticles.push({
            slug: '/how-to/do-something',
            type: strapiType,
        });
        totalNumberOfArticles += 1;
        const filteredArticles = removeDuplicatedArticles(
            snootyArticles,
            strapiArticles
        );
        expect(filteredArticles.length).toBe(totalNumberOfArticles - 1);
        const dedupedArticle = filteredArticles.find(
            ({ slug }) => slug === '/how-to/do-something'
        );
        expect(dedupedArticle.type).toBe(strapiType);
    });
    it('should remove an article from Snooty where a slug was fuzzy-duped', () => {
        // Add a new Strapi article with a trailing slash, modify our count
        strapiArticles.push({
            slug: '/how-to/do-something/',
            type: strapiType,
        });
        totalNumberOfArticles += 1;
        const filteredArticles = removeDuplicatedArticles(
            snootyArticles,
            strapiArticles
        );
        expect(filteredArticles.length).toBe(totalNumberOfArticles - 1);
        const dedupedArticle = filteredArticles.find(
            ({ slug }) => slug === '/how-to/do-something/'
        );
        expect(dedupedArticle.type).toBe(strapiType);
    });
});
