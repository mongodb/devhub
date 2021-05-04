import { aggregateAuthorInformation } from '../../src/utils/setup/aggregate-author-information';

it('should add properly aggregate items with a tag', () => {
    const articleOne = { authors: [{ name: 'authorOne' }] };
    const articleTwo = {
        authors: [{ name: 'authorOne' }, { name: 'authorTwo' }],
    };
    const articleThree = { authors: [] };
    const allArticles = [articleOne, articleTwo, articleThree];
    const result = aggregateAuthorInformation(allArticles);
    expect(result['authorOne']['pages']).toStrictEqual([
        articleOne,
        articleTwo,
    ]);
    expect(result['authorOne']['author']).toStrictEqual({
        name: 'authorOne',
    });
    expect(result['authorTwo']['pages']).toStrictEqual([articleTwo]);
});
