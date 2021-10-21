import { fuzzySlugMatch } from '../../src/utils/fuzzy-slug-match';

it('should properly compare slugs by ensuring leading and trailing slashes', () => {
    expect(fuzzySlugMatch('', '')).toBeTruthy();
    expect(fuzzySlugMatch('foo', 'foo')).toBeTruthy();
    expect(fuzzySlugMatch('/foo', 'foo')).toBeTruthy();
    expect(fuzzySlugMatch('/foo', 'foo/')).toBeTruthy();
    expect(fuzzySlugMatch('foo', 'bar')).toBeFalsy();
    expect(fuzzySlugMatch('/foo', '/bar')).toBeFalsy();
    expect(fuzzySlugMatch('/foo/', '/bar/')).toBeFalsy();
    expect(fuzzySlugMatch('/foo/bar', '/bar')).toBeFalsy();
    expect(fuzzySlugMatch('/foo/bar/', '/bar/foo')).toBeFalsy();
    expect(fuzzySlugMatch('/foo/bar/', 'foo/bar')).toBeTruthy();
});
