// Mocks the stitch SDK for jest testing
const stitchSdk = jest.requireActual('mongodb-stitch-browser-sdk');

module.exports = {
    ...stitchSdk,
    Stitch: {
        auth: {
            loginWithCredential: jest.fn(),
        },
        hasAppClient: jest.fn(),
        initializeAppClient: () => ({
            auth: {
                loginWithCredential: jest.fn(),
            },
            callFunction: window.fetch,
        }),
    },
};
