export const addTrailingSlashIfMissing = url => {
    if (url && url.match(/\/$/)) {
        return url;
    }
    return `${url}/`;
};
