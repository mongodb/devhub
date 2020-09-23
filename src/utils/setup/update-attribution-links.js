import dlv from 'dlv';
export const ATLAS_SIGNUP_LINK = 'https://www.mongodb.com/cloud/atlas/signup';
// Helper function which adds a tck query param for Atlas signup links (DEVHUB-175/174)
export const updateAttributionLinks = (doc, atlasTckValue) => {
    // Search through ast.children
    const children = dlv(doc, 'ast.children', []);
    const findAndUpdateAtlasAttributionRefs = node => {
        if (node['type'] === 'reference') {
            if (node.refuri && node.refuri.includes(ATLAS_SIGNUP_LINK)) {
                let oldSignupBaseUrl = ATLAS_SIGNUP_LINK;
                let suffix = `tck=devhub-${atlasTckValue}`;
                // If there are already query params, we want to be sure to
                // preserve them, including the leading "?"
                if (node.refuri.includes(`${ATLAS_SIGNUP_LINK}?`)) {
                    oldSignupBaseUrl = `${oldSignupBaseUrl}?`;
                    suffix = `${suffix}&`;
                }
                node.refuri = node.refuri.replace(
                    oldSignupBaseUrl,
                    ATLAS_SIGNUP_LINK + `?${encodeURIComponent(suffix)}`
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
};
