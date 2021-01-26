import { isNewPage } from '../../src/utils/is-new-page';

it('should identify when a new page is being navigated to', () => {
    const prevLocation = { pathname: '/learn' };
    const newLocationNotMatching = { pathname: '/community' };
    const newLocationMatching = prevLocation;
    const newLocationMatchWithSlash = { pathname: '/learn/' };

    expect(isNewPage(prevLocation, newLocationNotMatching)).toBeTruthy();
    expect(isNewPage(prevLocation, newLocationMatching)).toBeFalsy();
    expect(isNewPage(prevLocation, newLocationMatchWithSlash)).toBeFalsy();
});
