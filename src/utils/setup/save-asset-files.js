import { promises as fs } from 'fs';
import path from 'path';
import { ASSETS_COLLECTION } from '../../build-constants';
import { getMetadata } from '../get-metadata';

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
export const saveAssetFiles = async (assets, stitchClient) => {
    if (assets.length) {
        const promises = [];
        const assetQuery = { _id: { $in: assets } };
        const assetDataDocuments = await stitchClient.callFunction(
            'fetchDocuments',
            [DB, ASSETS_COLLECTION, assetQuery]
        );
        assetDataDocuments.forEach(asset => {
            promises.push(saveFile(asset));
        });
        await Promise.all(promises);
    }
};
