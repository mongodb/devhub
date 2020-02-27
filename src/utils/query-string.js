export function buildQueryString(params) {
    const entries = Object.keys(params).map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    );
    const string = entries.join('&');
    return string.length === 0 ? '' : '?' + string;
}

export function parseQueryString(querystring) {
    if (querystring.slice(0, 1) === '?') {
        querystring = querystring.slice(1);
    }

    // If there are zero entries, then querystring.split('&')
    // would be [''] rather than [], so handle this as a special
    // case.
    if (querystring.length === 0) {
        return {};
    }
    const entries = querystring.split('&');

    const result = {};
    entries.forEach(entry => {
        const [key, value] = entry.split('=').map(decodeURIComponent);
        result[key] = value;
    });
    return result;
}
