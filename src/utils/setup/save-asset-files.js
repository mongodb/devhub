import { promises as fs } from 'fs';
import path from 'path';
import { RemoteMongoClient } from 'mongodb-stitch-server-services-mongodb-remote';
import { ASSETS_COLLECTION } from '../../build-constants';
import { getMetadata } from '../get-metadata';

const metadata = getMetadata();
const DB = metadata.database;

const CHUNK_SIZE = 500;

const saveFile = async (buffer, filepath) => {
    await fs.mkdir(path.join('static', path.dirname(filepath)), {
        recursive: true,
    });
    await fs.writeFile(path.join('static', filepath), buffer, 'binary');
};

// Write all assets to static directory while including all filepaths
export const saveAssetFiles = async (assets, stitchClient) => {
    const numAssets = Object.keys(assets).length;
    if (numAssets) {
        const assetQuery = { _id: { $in: Object.keys(assets) } };
        const assetCollection = stitchClient
            .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
            .db(DB)
            .collection(ASSETS_COLLECTION);

        // Given CHUNK_SIZE and the total number of assets to fetch, query the db `iterations` number of times to avoid hitting Realm's memory limit
        const iterations = Math.ceil(numAssets / CHUNK_SIZE);
        const assetDataDocuments = await Promise.all(
            [...Array(iterations).keys()].map(i =>
                assetCollection
                    .aggregate([
                        { $match: assetQuery },
                        { $skip: i * CHUNK_SIZE },
                        { $limit: CHUNK_SIZE },
                    ])
                    .toArray()
            )
        );
        const promises = [];
        assetDataDocuments.forEach(chunk => {
            chunk.forEach(asset => {
                // Be sure to save each asset for every filepath specified
                assets[asset._id].forEach(filepath => {
                    promises.push(saveFile(asset.data.buffer, filepath));
                });
            });
        });
        await Promise.all(promises);
    }
};
