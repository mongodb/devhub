import { addTrailingSlashIfMissing } from './add-trailing-slash-if-missing';
import { removeTrailingSlash } from './remove-trailing-slash';

export const getArticleShareLinks = (title, url) => {
    const urlWithTrailingSlash = addTrailingSlashIfMissing(url);
    const urlWithoutTrailingSlash = removeTrailingSlash(url);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlWithoutTrailingSlash}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${urlWithoutTrailingSlash}&text=${encodeURIComponent(
        title
    )}`;
    // LinkedIn throws redirects to the same exact URL without a trailing slash
    const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${urlWithTrailingSlash}`;
    return {
        articleUrl: urlWithTrailingSlash,
        facebookUrl,
        linkedInUrl,
        twitterUrl,
    };
};
