export const addTrailingSlashIfMissing = url => {
    if (url && url.match(/\/$/)) {
        return url;
    }
    return `${url}/`;
};

// More complicated function to add a trailing slash but before any query params
// or anchor links
export const addTrailingSlashBeforeParams = path => {
    if (path.includes('?')) {
        // Query params
        const pieces = path.split('?');
        return addTrailingSlashIfMissing(pieces[0]) + `?${pieces[1]}`;
    } else if (path.includes('#')) {
        // Anchor without query params
        const pieces = path.split('#');
        return addTrailingSlashIfMissing(pieces[0]) + `#${pieces[1]}`;
    }
    return addTrailingSlashIfMissing(path);
};
