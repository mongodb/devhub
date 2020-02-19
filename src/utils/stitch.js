import { AnonymousCredential, Stitch } from 'mongodb-stitch-browser-sdk';
import { isBrowser } from '../utils/is-browser';

const initializeApp = appId =>
    Stitch.hasAppClient(appId)
        ? Stitch.getAppClient(appId)
        : Stitch.initializeAppClient(appId);

const stitchClient = isBrowser() ? initializeApp('snooty-koueq') : {};

export const authenticate = async () => {
    try {
        await stitchClient.auth.loginWithCredential(new AnonymousCredential());
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
export const callStitchFunction = async (fnName, metadata, ...fnArgs) => {
    try {
        return stitchClient.callFunction(fnName, [metadata, ...fnArgs]);
    } catch (error) {
        console.error(error);
    }
};
