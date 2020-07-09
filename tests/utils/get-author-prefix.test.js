import { getAuthorPrefix } from '../../src/utils/get-author-prefix';

const getFullBylineString = arr =>
    arr.map((name, i) => `${getAuthorPrefix(i, arr.length)}${name}`).join('');

it('should correctly parse a line of authors based on the number of authors', () => {
    const singleAuthorArray = ['Single Author'];
    const singleAuthorResult = getFullBylineString(singleAuthorArray);
    expect(singleAuthorResult).toBe('By Single Author');

    const twoAuthorArray = ['First Author', 'Second Author'];
    const twoAuthorResult = getFullBylineString(twoAuthorArray);
    expect(twoAuthorResult).toBe('By First Author\u00a0and Second Author');

    const threeAuthorArray = ['First Author', 'Second Author', 'Third Author'];
    const threeAuthorResult = getFullBylineString(threeAuthorArray);
    expect(threeAuthorResult).toBe(
        'By First Author, Second Author, and Third Author'
    );
});
