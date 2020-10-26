import { promises as fs } from 'fs';
import path from 'path';
import { RemoteMongoClient } from 'mongodb-stitch-server-sdk';
import { ASSETS_COLLECTION } from '../../build-constants';
import { getMetadata } from '../get-metadata';

const metadata = getMetadata();
const DB = metadata.database;

const CHUNK_SIZE = 500;

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
        const assetQuery = { _id: { $in: assets } };
        const assetCollection = stitchClient
            .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
            .db(DB)
            .collection(ASSETS_COLLECTION);

        // Given CHUNK_SIZE and the total number of assets to fetch, query the db `iterations` number of times to avoid hitting Realm's memory limit
        const iterations = Math.ceil(assets.length / CHUNK_SIZE);
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
                promises.push(saveFile(asset));
            });
        });
        await Promise.all(promises);
    }
};
