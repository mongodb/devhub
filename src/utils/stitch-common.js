import { AnonymousCredential, Stitch } from 'mongodb-stitch-browser-sdk';
import { isBrowser } from './is-browser';
import { RealmError } from '../classes/realm-error';

const initializeApp = appId =>
    Stitch.hasAppClient(appId)
        ? Stitch.getAppClient(appId)
        : Stitch.initializeAppClient(appId);

const stitchClient = appId => (isBrowser() ? initializeApp(appId) : {});

export const authenticate = async appId => {
    try {
        await stitchClient(appId).auth.loginWithCredential(
            new AnonymousCredential()
        );
    } catch (error) {
        new RealmError(error);
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
        await authenticate(appId);
        return stitchClient(appId).callFunction(fnName, fnArgs);
    } catch (error) {
        new RealmError(error);
    }
};
