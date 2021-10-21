export const addLeadingSlashIfMissing = url => {
    if (url && url.match(/^\//)) {
        return url;
    }
    return `/${url}`;
};
