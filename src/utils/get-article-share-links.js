import { removeTrailingSlash } from './remove-trailing-slash';

export const getArticleShareLinks = (title, url) => {
    const urlWithoutTrailingSlash = removeTrailingSlash(url);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlWithoutTrailingSlash}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${urlWithoutTrailingSlash}&text=${encodeURIComponent(
        title
    )}`;
    // LinkedIn throws redirects to the same exact URL without a trailing slash
    const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${urlWithoutTrailingSlash}/`;
    return {
        articleUrl: urlWithoutTrailingSlash,
        facebookUrl,
        linkedInUrl,
        twitterUrl,
    };
};
