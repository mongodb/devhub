import { addTrailingSlashIfMissing } from '../../src/utils/add-trailing-slash-if-missing';

it('should add trailing slashes to links if they are missing', () => {
    const linkWithoutSlash = 'foo.bar';
    const linkWithSlash = `${linkWithoutSlash}/`;
    expect(addTrailingSlashIfMissing(linkWithSlash)).toBe(linkWithSlash);

    // Should ignore anything without a slash
    expect(addTrailingSlashIfMissing(linkWithoutSlash)).toBe(linkWithSlash);

    // Should handle null/empty inputs
    expect(addTrailingSlashIfMissing('')).toBe('/');
});
