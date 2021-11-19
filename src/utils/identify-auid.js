/**
 * This function takes an AUID (a universal identifier for MDB) and calls the
 * Marketing Ops identify function to bind related actions to this AUID.
 * @param {*} auid A string to represent the ID for a signed-in user
 * @returns null
 */
export const identifyAuid = auid => {
    if (!window || !window.analytics) return;
    try {
        window.analytics.identify(auid);
    } catch (err) {
        console.error(`Error identifying user`, err);
    }
};
