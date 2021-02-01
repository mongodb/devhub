import { App, Credentials } from 'realm-web';
import { isBrowser } from './is-browser';

export const authenticate = async appId => {
    if (!isBrowser()) {
        return {};
    }
    const app = new App({ id: appId });
    const credentials = Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        return user;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Calls a function from Stitch and returns array of documents that match the specified query filters.
 * @param {string} fnName
 * @param {Object<string, any>} metadata - see hooks/use-site-metadata.js
 * @property {string} commitHash
 * @property {string} database
 * @property {string} parserBranch
 * @property {string} project
 * @property {string} user
 * @param {<any>} fnArgs - indefinite number of arguments used in function call
 * @returns {array} array of MongoDB documents
 */
export const callStitchFunction = async (fnName, appId, fnArgs) => {
    try {
        const appUser = await authenticate(appId);
        console.log(appUser, fnName);
        const result = await appUser.functions[fnName](...fnArgs);
        return result;
    } catch (error) {
        console.error(error);
    }
};
