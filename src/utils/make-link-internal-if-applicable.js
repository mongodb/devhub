import { withPrefix } from 'gatsby';
import { addTrailingSlashIfMissing } from './add-trailing-slash-if-missing';
import {
    FORUMS_URL,
    OLD_SITE_URL,
    SITE_URL,
    OLD_SUBDOMAIN_FORUMS_URL,
} from '~src/constants';
import { isLinkForImage } from '~utils/is-link-for-image';

export const makeLinkInternalIfApplicable = (link, includePrefix = false) => {
    if (!link) {
        return link;
    }
    const linkIncludesDevHub =
        link.includes(OLD_SITE_URL) || link.includes(SITE_URL);
    const linkGoesToForums =
        link.includes(OLD_SUBDOMAIN_FORUMS_URL) || link.includes(FORUMS_URL);
    if (linkIncludesDevHub && !linkGoesToForums) {
        const linkWithoutSiteUrl = link
            .replace(SITE_URL, '')
            .replace(OLD_SITE_URL, '');
        // Forums is technically "external" from an app standpoint, so we leave
        // that one alone
        return isLinkForImage(link)
            ? withPrefix(linkWithoutSiteUrl)
            : addTrailingSlashIfMissing(
                  includePrefix
                      ? withPrefix(linkWithoutSiteUrl)
                      : linkWithoutSiteUrl
              );
    }
    return link;
};
