const credentials = 'same-origin';

/**
 * @param {Object} response
 * @property {function} response.json
 * @returns {Object} json response
 */
const responseJSON = response => response.json();
/**
 * @param {Object} response
 * @property {boolean} response.ok
 * @returns {boolean} unsuccessful response
 */
const isBadResponse = response => !response || (response && !response.ok);

/**
 *
 * @param {String} url
 * @returns {Promise} json response
 */
export const get = async (url, headers = {}) => {
    const response = await fetch(url, {
        credentials,
        headers,
    });
    if (isBadResponse(response)) {
        throw new Error(response);
    }
    return await responseJSON(response);
};
