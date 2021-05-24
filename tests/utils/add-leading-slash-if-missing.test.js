import { addLeadingSlashIfMissing } from '../../src/utils/add-leading-slash-if-missing';

it('should add leading slashes to links if they are missing', () => {
    const linkWithoutSlash = 'foo.bar';
    const linkWithSlash = `/${linkWithoutSlash}`;
    expect(addLeadingSlashIfMissing(linkWithSlash)).toBe(linkWithSlash);

    // Should ignore anything without a slash
    expect(addLeadingSlashIfMissing(linkWithoutSlash)).toBe(linkWithSlash);

    // Should handle null/empty inputs
    expect(addLeadingSlashIfMissing('')).toBe('/');
});

it('should add leading slashes to URLs which have additional params appropriately', () => {
    const link = 'foo.bar';
    const linkWithLeadingSlash = `/${link}`;
    const linkWithQueryParams = `${link}?content=true`;
    const linkWithQueryParamsSlash = `${linkWithLeadingSlash}?content=true`;
    const linkWithQueryParamsAndAnchor = `${link}?content=true#main`;
    const linkWithQueryParamsAndAnchorSlash = `${linkWithLeadingSlash}?content=true#main`;
    const linkWithAnchor = `${link}#main`;
    const linkWithAnchorSlash = `${linkWithLeadingSlash}#main`;

    expect(addLeadingSlashIfMissing(link)).toBe(linkWithLeadingSlash);
    expect(addLeadingSlashIfMissing(linkWithQueryParams)).toBe(
        linkWithQueryParamsSlash
    );
    expect(addLeadingSlashIfMissing(linkWithQueryParamsAndAnchor)).toBe(
        linkWithQueryParamsAndAnchorSlash
    );
    expect(addLeadingSlashIfMissing(linkWithAnchor)).toBe(linkWithAnchorSlash);
});
