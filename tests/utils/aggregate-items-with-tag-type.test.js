import { aggregateItemsWithTagType } from '../../src/utils/setup/aggregate-items-with-tag-type';

it('should add properly aggregate items with a tag', () => {
    const articleOne = { tag: 'foo', authors: [{ label: 'authorOne' }] };
    const articleTwo = {
        tag: 'bar',
        authors: [{ label: 'authorOne' }, { label: 'authorTwo' }],
    };
    const articleThree = { tag: 'foo', authors: [] };
    const allArticles = [articleOne, articleTwo, articleThree];
    const result = aggregateItemsWithTagType(allArticles, 'tag');
    const authorsResult = aggregateItemsWithTagType(
        allArticles,
        'authors',
        true
    );
    expect(result['foo']).toStrictEqual([articleOne, articleThree]);
    expect(result['bar']).toStrictEqual([articleTwo]);
    expect(authorsResult['authorOne']).toStrictEqual([articleOne, articleTwo]);
    expect(authorsResult['authorTwo']).toStrictEqual([articleTwo]);
});
