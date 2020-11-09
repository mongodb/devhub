import { getNestedValue } from '../get-nested-value';

export const createAssetNodes = (doc, createNode, createContentDigest) => {
    const assets = new Map();
    const pageNode = getNestedValue(['ast', 'children'], doc);
    if (pageNode) {
        // Cache static assets to save file i/o on repeated builds
        doc.static_assets.forEach(asset => {
            const checksum = asset.checksum;
            if (assets.has(checksum)) {
                assets.set(
                    checksum,
                    new Set([...assets.get(checksum), asset.key])
                );
            } else {
                assets.set(checksum, new Set([asset.key]));
            }
        });
        Array.from(assets.keys()).forEach(checksum => {
            const assetNode = {
                id: checksum,
                parent: null,
                children: [],
                paths: Array.from(assets.get(checksum)),
                internal: {
                    type: 'Asset',
                    contentDigest: createContentDigest(checksum),
                },
            };
            createNode(assetNode);
        });
    }
};
