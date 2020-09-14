import dlv from 'dlv';
const ATLAS_SIGNUP_LINK = 'https://www.mongodb.com/cloud/atlas/signup';
// Helper function which adds a tck query param for Atlas signup links (DEVHUB-175/174)
export const updateAttributionLinks = (doc, atlasTckValue) => {
    // Search through ast.children
    const children = dlv(doc, 'ast.children', null);
    if (children) {
        const findAndUpdateAtlasAttributionRefs = node => {
            if (node['type'] === 'reference') {
                if (node.refuri && node.refuri.includes(ATLAS_SIGNUP_LINK)) {
                    let oldSignupBaseUrl = ATLAS_SIGNUP_LINK;
                    const newSignupBaseUrl = `https://www.mongodb.com/cloud/atlas/signup${encodeURIComponent(
                        `?tck=devhub_${atlasTckValue}&`
                    )}`;
                    // If there are already query params, we want to be sure to
                    // preserve them, including the leading "?"
                    if (node.refuri.includes(`${ATLAS_SIGNUP_LINK}?`)) {
                        oldSignupBaseUrl = `${ATLAS_SIGNUP_LINK}?`;
                    }
                    node.refuri = node.refuri.replace(
                        oldSignupBaseUrl,
                        newSignupBaseUrl
                    );
                }
            }
            if (node.children) {
                // Recursively iterate to check other refs
                node.children.forEach(findAndUpdateAtlasAttributionRefs);
            }
        };
        // Check through ast children for relevant references and update
        children.forEach(findAndUpdateAtlasAttributionRefs);
    }
};
