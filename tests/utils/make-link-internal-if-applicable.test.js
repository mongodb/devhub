import { makeLinkInternalIfApplicable } from '~utils/make-link-internal-if-applicable';

const DEVHUB_URL = 'https://developer.mongodb.com';
const FORUMS_URL = 'https://developer.mongodb.com/community/forums';

it('should parse internal links and add a trailing slash if needed', () => {
    expect(makeLinkInternalIfApplicable(null)).toBe(null);
    expect(makeLinkInternalIfApplicable('')).toBe('');

    const internalArticleSlug = '/foo/bar';
    const internalArticleSlugTrailingSlash = `${internalArticleSlug}/`;
    const fullArticleLink = `${DEVHUB_URL}${internalArticleSlug}`;

    const forumsLink = `${FORUMS_URL}/u/foo`;
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
