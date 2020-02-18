import { Stitch } from 'mongodb-stitch-browser-sdk';
import { isBrowser } from '../utils/is-browser';

const initializeApp = appId =>
    Stitch.hasAppClient(appId)
        ? Stitch.getAppClient(appId)
        : Stitch.initializeAppClient(appId);

const stitchClient = isBrowser() ? initializeApp('snooty-koueq') : {};

export const callStitchFunction = async (fnName, metadata, fnArgs) => {
    try {
        return stitchClient.callFunction(fnName, [metadata, fnArgs]);
    } catch (error) {
        console.error(error);
    }
};
