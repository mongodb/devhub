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
        const [slug, suffix] = path.split('?');
        return addTrailingSlashIfMissing(slug) + `?${suffix}`;
    } else if (path.includes('#')) {
        // Anchor without query params
        const [slug, suffix] = path.split('#');
        return addTrailingSlashIfMissing(slug) + `#${suffix}`;
    }
    return addTrailingSlashIfMissing(path);
};
