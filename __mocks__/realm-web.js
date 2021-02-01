// Mocks the stitch SDK for jest testing
const realmWeb = jest.requireActual('realm-web');

class App {
    init() {}

    logIn = () => ({
        functions: {
            fetchTextFilterResults: window.fetch,
        },
    });
}

module.exports = {
    ...realmWeb,
    App: App,
};
