import { Stitch, AnonymousCredential } from 'mongodb-stitch-server-sdk';
import { SNOOTY_STITCH_ID } from '../../build-constants';

export const initStitch = async () => {
    const stitchClient = Stitch.hasAppClient(SNOOTY_STITCH_ID)
        ? Stitch.getAppClient(SNOOTY_STITCH_ID)
        : Stitch.initializeAppClient(SNOOTY_STITCH_ID);
    await stitchClient.auth
        .loginWithCredential(new AnonymousCredential())
        .catch(console.error);
    return stitchClient;
};
