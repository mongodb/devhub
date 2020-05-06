const { Stitch, AnonymousCredential } = require('mongodb-stitch-server-sdk');

const initStitch = async stitchId => {
    const stitchClient = Stitch.hasAppClient(stitchId)
        ? Stitch.getAppClient(stitchId)
        : Stitch.initializeAppClient(stitchId);
    await stitchClient.auth
        .loginWithCredential(new AnonymousCredential())
        .catch(console.error);
    return stitchClient;
};

module.exports = { initStitch };
