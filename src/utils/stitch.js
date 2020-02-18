import { Stitch } from 'mongodb-stitch-browser-sdk';
import { isBrowser } from '../utils/is-browser';

const initializeApp = appId =>
    Stitch.hasAppClient(appId)
        ? Stitch.getAppClient(appId)
        : Stitch.initializeAppClient(appId);

const stitchClient = isBrowser() ? initializeApp('snooty-koueq') : {};

/**
 * Calls a function from Stitch and returns array of documents that match the specified query filters.
 * @param {string} fnName
 * @param {Object<string, any>} metadata (see hooks/use-site-metadata.js)
 * @property {string} commitHash
 * @property {string} database
 * @property {string} parserBranch
 * @property {string} project
 * @property {string} user
 * @param {Array<any>} fnArgs
 * @returns {array} array of MongoDB documents
 */
export const callStitchFunction = async (fnName, metadata, fnArgs) => {
    try {
        return stitchClient.callFunction(fnName, [metadata, ...fnArgs]);
    } catch (error) {
        console.error(error);
    }
};
