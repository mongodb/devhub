var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _axios = _interopRequireDefault(require('axios'));

var _lodash = require('lodash');

module.exports = async (endpoint, ctx) => {
  const { apiURL, publicationState, queryLimit, jwtToken, reporter } = ctx; // Define API endpoint.

  let apiBase = `${apiURL}/${endpoint}`;
  const apiEndpoint = `${apiBase}?_limit=${queryLimit}&_publicationState=${publicationState}`;
  reporter.info(`Starting to fetch data from Strapi - ${apiEndpoint}`);

  try {
    const { data } = await (0, _axios.default)(apiEndpoint, addAuthorizationHeader({}, jwtToken));
    return (0, _lodash.castArray)(data).map(clean);
  } catch (error) {
    reporter.panic(`Failed to fetch data from Strapi`, error);
  }
};
/**
 * Remove fields starting with `_` symbol.
 *
 * @param {object} item - Entry needing clean
 * @returns {object} output - Object cleaned
 */

const clean = (item) => {
  (0, _lodash.forEach)(item, (value, key) => {
    if (key === `__v`) {
      // Remove mongo's __v
      delete item[key];
    } else if (key === `_id`) {
      // Rename mongo's "_id" key to "id".
      delete item[key];
      item.id = value;
    } else if ((0, _lodash.startsWith)(key, '__')) {
      // Gatsby reserves double-underscore prefixes – replace prefix with "strapi"
      delete item[key];
      item[`strapi_${key.slice(2)}`] = value;
    } else if ((0, _lodash.isObject)(value)) {
      item[key] = clean(value);
    }
  });
  return item;
};

const addAuthorizationHeader = (options, token) => {
  if (token) {
    (0, _lodash.set)(options, 'headers.Authorization', `Bearer ${token}`);
  }

  return options;
};
