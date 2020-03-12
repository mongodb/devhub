export const getArticleShareLinks = (title, url) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
        `Here is a post from @mongodb on "${title}"`
    )}`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${url}`;
    return { facebookUrl, linkedInUrl, twitterUrl };
};
