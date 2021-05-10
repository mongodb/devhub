const isExternalUrl = /^http(s)?:\/\//;

export const getImageSrc = (src, siteUrl) => {
    if (!src) {
        return null;
    }

    return isExternalUrl.test(src) ? src : siteUrl + src;
};
