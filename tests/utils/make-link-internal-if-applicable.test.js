import { makeLinkInternalIfApplicable } from '~utils/make-link-internal-if-applicable';
import { OLD_SUBDOMAIN_FORUMS_URL, SITE_URL } from '~src/constants';

it('should parse internal links and add a trailing slash if needed', () => {
    expect(makeLinkInternalIfApplicable(null)).toBe(null);
    expect(makeLinkInternalIfApplicable('')).toBe('');

    const internalArticleSlug = '/foo/bar';
    const internalArticleSlugTrailingSlash = `${internalArticleSlug}/`;
    const fullArticleLink = `${SITE_URL}${internalArticleSlug}`;

    const forumsLink = `${OLD_SUBDOMAIN_FORUMS_URL}/u/foo`;
    const externalLink = 'https://google.com';

    // Check common case
    expect(makeLinkInternalIfApplicable(fullArticleLink)).toBe(
        internalArticleSlugTrailingSlash
    );

    // Check no second trailing slash is added
    expect(makeLinkInternalIfApplicable(`${fullArticleLink}/`)).toBe(
        internalArticleSlugTrailingSlash
    );

    // Expect an internal link to be untouched
    expect(makeLinkInternalIfApplicable(internalArticleSlug)).toBe(
        internalArticleSlug
    );

    // Check the forums are not internal
    expect(makeLinkInternalIfApplicable(forumsLink)).toBe(forumsLink);

    // Check a random outside link that it is untouched
    expect(makeLinkInternalIfApplicable(externalLink)).toBe(externalLink);
});
