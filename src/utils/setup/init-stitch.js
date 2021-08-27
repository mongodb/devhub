import { Stitch, AnonymousCredential } from 'mongodb-stitch-server-sdk';
import { SNOOTY_STITCH_ID } from '../../build-constants';
import { RealmError } from '../../classes/realm-error';

export const initStitch = async (id = SNOOTY_STITCH_ID) => {
    const stitchClient = Stitch.hasAppClient(id)
        ? Stitch.getAppClient(id)
        : Stitch.initializeAppClient(id);
    await stitchClient.auth
        .loginWithCredential(new AnonymousCredential())
        .catch(e => new RealmError(e));
    return stitchClient;
};
