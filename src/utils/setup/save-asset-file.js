const fs = require('fs').promises;
const path = require('path');
const { ASSETS_COLLECTION } = require('../../build-constants');
const { getMetadata } = require('../get-metadata');

const metadata = getMetadata();
const DB = metadata.database;

const saveFile = async asset => {
    await fs.mkdir(path.join('static', path.dirname(asset.filename)), {
        recursive: true,
    });
    await fs.writeFile(
        path.join('static', asset.filename),
        asset.data.buffer,
        'binary'
    );
};

// Write all assets to static directory
const saveAssetFile = async (asset, stitchClient) => {
    const promises = [];
    const assetQuery = { _id: { $eq: asset } };
    const assetDataDocuments = await stitchClient.callFunction(
        'fetchDocuments',
        [DB, ASSETS_COLLECTION, assetQuery]
    );
    assetDataDocuments.forEach(asset => {
        promises.push(saveFile(asset));
    });
    return Promise.all(promises);
};

module.exports = { saveAssetFile };
