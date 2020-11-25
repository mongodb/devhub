// Returns a copy of the input string without a trailing slash, should it have one
export const removeTrailingSlash = url =>
    url && (url.match(/\/$/) ? url.slice(0, url.length - 1) : url);
