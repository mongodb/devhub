export function buildQueryString(params) {
    const entries = Object.keys(params)
        .sort()
        .map(
            key =>
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        );
    const string = entries.join('&');
    return string.length === 0 ? '' : '?' + string;
}

/**
 * decodeURIComponent doesn't handle parsing the plus symbol to a space
 * This function allows us to handle this special case
 * https://chromium.googlesource.com/chromium/src.git/+/62.0.3178.1/third_party/google_input_tools/third_party/closure_library/closure/goog/string/string.js?autodive=0%2F%2F%2F%2F#486
 */
const decodeURIComponentWithPlus = component =>
    decodeURIComponent(component.replace(/\+/g, ' '));

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
        const [key, value] = entry.split('=').map(decodeURIComponentWithPlus);
        result[key] = value;
    });
    return result;
}
