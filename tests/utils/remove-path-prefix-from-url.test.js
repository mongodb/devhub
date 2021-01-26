import { removePathPrefixFromUrl } from '../../src/utils/remove-path-prefix-from-url';

it('should remove a path prefix where appropriate', () => {
    __PATH_PREFIX__ = '/test/path-prefix/';
    const pathWithoutPathPrefix = 'foo.bar';
    const pathWithPathPrefix = `${__PATH_PREFIX__}${pathWithoutPathPrefix}`;
    expect(removePathPrefixFromUrl(pathWithPathPrefix)).toBe(
        pathWithoutPathPrefix
    );

    // Should ignore anything without the path prefix
    expect(removePathPrefixFromUrl(pathWithoutPathPrefix)).toBe(
        pathWithoutPathPrefix
    );

    // Should handle empty inputs
    expect(removePathPrefixFromUrl('')).toBe('');
    __PATH_PREFIX__ = '';
});
