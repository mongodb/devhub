import { getNestedValue } from '../get-nested-value';

export const createAssetNodes = (doc, createNode, createContentDigest) => {
    const pageNode = getNestedValue(['ast', 'children'], doc);
    if (pageNode) {
        // Cache static assets to save file i/o on repeated builds
        doc.static_assets.forEach(asset => {
            const assetNode = {
                id: asset,
                parent: null,
                children: [],
                internal: {
                    type: 'Asset',
                    content: asset,
                    contentDigest: createContentDigest(asset),
                },
            };
            createNode(assetNode);
        });
    }
};
