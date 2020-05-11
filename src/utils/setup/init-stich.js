const { Stitch, AnonymousCredential } = require('mongodb-stitch-server-sdk');
const { SNOOTY_STITCH_ID } = require('../../build-constants');

const initStitch = async (clientId = SNOOTY_STITCH_ID) => {
    const stitchClient = Stitch.hasAppClient(clientId)
        ? Stitch.getAppClient(clientId)
        : Stitch.initializeAppClient(clientId);
    await stitchClient.auth
        .loginWithCredential(new AnonymousCredential())
        .catch(console.error);
    return stitchClient;
};

module.exports = { initStitch };
