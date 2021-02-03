import {
    addTrailingSlashBeforeParams,
    addTrailingSlashIfMissing,
} from '../../src/utils/add-trailing-slash-if-missing';

it('should add trailing slashes to links if they are missing', () => {
    const linkWithoutSlash = 'foo.bar';
    const linkWithSlash = `${linkWithoutSlash}/`;
    expect(addTrailingSlashIfMissing(linkWithSlash)).toBe(linkWithSlash);

    // Should ignore anything without a slash
    expect(addTrailingSlashIfMissing(linkWithoutSlash)).toBe(linkWithSlash);

    // Should handle null/empty inputs
    expect(addTrailingSlashIfMissing('')).toBe('/');
});

it('should add trailing slashes to URLs which have additional params appropriately', () => {
    const link = 'foo.bar';
    const linkWithTrailingSlash = `${link}/`;
    const linkWithQueryParams = `${link}?content=true`;
    const linkWithQueryParamsSlash = `${linkWithTrailingSlash}?content=true`;
    const linkWithQueryParamsAndAnchor = `${link}?content=true#main`;
    const linkWithQueryParamsAndAnchorSlash = `${linkWithTrailingSlash}?content=true#main`;
    const linkWithAnchor = `${link}#main`;
    const linkWithAnchorSlash = `${linkWithTrailingSlash}#main`;

    expect(addTrailingSlashBeforeParams(link)).toBe(linkWithTrailingSlash);
    expect(addTrailingSlashBeforeParams(linkWithQueryParams)).toBe(
        linkWithQueryParamsSlash
    );
    expect(addTrailingSlashBeforeParams(linkWithQueryParamsAndAnchor)).toBe(
        linkWithQueryParamsAndAnchorSlash
    );
    expect(addTrailingSlashBeforeParams(linkWithAnchor)).toBe(
        linkWithAnchorSlash
    );
});
