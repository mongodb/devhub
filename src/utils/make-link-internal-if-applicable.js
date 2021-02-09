import { withPrefix } from 'gatsby';
import { addTrailingSlashIfMissing } from './add-trailing-slash-if-missing';

const DEVHUB_URL = 'https://developer.mongodb.com';
const FORUMS_URL = 'https://developer.mongodb.com/community/forums';

export const makeLinkInternalIfApplicable = link => {
    if (!link) {
        return link;
    }
    const linkIncludesDevHub = link.includes(DEVHUB_URL);
    const linkGoesToForums = link.includes(FORUMS_URL);
    if (linkIncludesDevHub && !linkGoesToForums) {
        // Forums is technically "external" from an app standpoint, so we leave
        // that one alone
        return addTrailingSlashIfMissing(
            withPrefix(link.replace(DEVHUB_URL, ''))
        );
    }
    return link;
};
