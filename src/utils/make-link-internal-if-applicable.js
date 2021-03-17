import { withPrefix } from 'gatsby';
import { addTrailingSlashIfMissing } from './add-trailing-slash-if-missing';
import { SITE_URL, FORUMS_URL } from '~src/constants';

export const makeLinkInternalIfApplicable = link => {
    if (!link) {
        return link;
    }
    const linkIncludesDevHub = link.includes(SITE_URL);
    const linkGoesToForums = link.includes(FORUMS_URL);
    if (linkIncludesDevHub && !linkGoesToForums) {
        // Forums is technically "external" from an app standpoint, so we leave
        // that one alone
        return addTrailingSlashIfMissing(
            withPrefix(link.replace(SITE_URL, ''))
        );
    }
    return link;
};
