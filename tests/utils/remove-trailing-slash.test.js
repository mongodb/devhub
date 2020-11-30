import { removeTrailingSlash } from '../../src/utils/remove-trailing-slash';

it('should remove trailing slashes from links where appropriate', () => {
    const linkWithoutSlash = 'foo.bar';
    const linkWithSlash = `${linkWithoutSlash}/`;
    expect(removeTrailingSlash(linkWithSlash)).toBe(linkWithoutSlash);

    // Should ignore anything without a slash
    expect(removeTrailingSlash(linkWithoutSlash)).toBe(linkWithoutSlash);

    // Should handle null/empty inputs
    expect(removeTrailingSlash(null)).toBeNull();
    expect(removeTrailingSlash('')).toBe('');
});
