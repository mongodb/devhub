import { createAssetNodes } from '../../src/utils/setup/create-asset-nodes';

it('should properly construct nodes for static assets', () => {
    const testArticle = {
        ast: {
            children: [],
        },
        // TODO: Update tests
        static_assets: [
            { checksum: 'asset_1', key: 'foo.txt' },
            { checksum: 'asset_2', key: 'bar.txt' },
            { checksum: 'asset_2', key: 'baz.txt' },
        ],
    };

    const createNode = jest.fn();
    const createContentDigest = jest.fn(asset => asset[0]);

    createAssetNodes(testArticle, createNode, createContentDigest);
    // Two assets share a checksum, so there should only be one call for the both of them
    expect(createNode.mock.calls.length).toBe(
        testArticle.static_assets.length - 1
    );

    // check asset_1 call node
    const firstNode = createNode.mock.calls[0][0];
    expect(firstNode.id).toBe(testArticle.static_assets[0].checksum);
    expect(firstNode.paths).toStrictEqual([testArticle.static_assets[0].key]);
    expect(firstNode.internal.type).toBe('Asset');
    expect(firstNode.internal.contentDigest).toBe(
        createContentDigest(testArticle.static_assets[0].checksum)
    );

    // check filepaths were consolidated properly
    const shareChecksumNode = createNode.mock.calls[1][0];
    expect(shareChecksumNode.id).toBe(testArticle.static_assets[1].checksum);
    // At this point there should be two filepaths for this asset, but they may change order due to implementation as Set
    expect(shareChecksumNode.paths).toContain(testArticle.static_assets[1].key);
    expect(shareChecksumNode.paths).toContain(testArticle.static_assets[2].key);
    expect(shareChecksumNode.internal.type).toBe('Asset');
    expect(shareChecksumNode.internal.contentDigest).toBe(
        createContentDigest(testArticle.static_assets[0].checksum)
    );
});
