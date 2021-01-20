import { hasAnchorLink } from '../../src/utils/has-anchor-link';

it('should determine whether or not a location object has an anchor link', () => {
    const hasAnchor = { hash: '#main' };
    const doesNotHaveAnchor = { hash: '' };
    const alsoDoesNotHaveAnchor = {};

    expect(hasAnchorLink(hasAnchor)).toBeTruthy();
    expect(hasAnchorLink(doesNotHaveAnchor)).toBeFalsy();
    expect(hasAnchorLink(alsoDoesNotHaveAnchor)).toBeFalsy();
});
