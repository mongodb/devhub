const path = require('path');
const fs = require('fs').promises;
const mkdirp = require('mkdirp');
const { Stitch, AnonymousCredential } = require('mongodb-stitch-server-sdk');
const {
    validateEnvVariables,
} = require('./src/utils/setup/validate-env-variables');
const { getNestedValue } = require('./src/utils/get-nested-value');
const { getTemplate } = require('./src/utils/get-template');
const { getPageSlug } = require('./src/utils/get-page-slug');
const { getMetadata } = require('./src/utils/get-metadata');

// Consolidated metadata object used to identify build and env variables
const metadata = getMetadata();

// Atlas DB config
const DB = metadata.database;
const DOCUMENTS_COLLECTION = 'documents';
const ASSETS_COLLECTION = 'assets';
const METADATA_COLLECTION = 'metadata';

const SNOOTY_STITCH_ID = 'snooty-koueq';
let PAGE_ID_PREFIX;

// different types of references
const PAGES = [];
const IMAGE_FILES = {};

// in-memory object with key/value = filename/document
let RESOLVED_REF_DOC_MAPPING = {};

// stich client connection
let stitchClient;

const setupStitch = () => {
    return new Promise((resolve, reject) => {
        stitchClient = Stitch.hasAppClient(SNOOTY_STITCH_ID)
            ? Stitch.getAppClient(SNOOTY_STITCH_ID)
            : Stitch.initializeAppClient(SNOOTY_STITCH_ID);
        stitchClient.auth
            .loginWithCredential(new AnonymousCredential())
            .then(user => {
                console.log('logged into stitch');
                resolve();
            })
            .catch(console.error);
    });
};

const saveAssetFile = async asset => {
    return new Promise((resolve, reject) => {
        // Create nested directories as specified by the asset filenames if they do not exist
        mkdirp(path.join('static', path.dirname(asset.filename)), err => {
            if (err) return reject(err);
            fs.writeFile(
                path.join('static', asset.filename),
                asset.data.buffer,
                'binary',
                err => {
                    if (err) reject(err);
                }
            );
            resolve();
        });
    });
};

// Write all assets to static directory
const saveAssetFiles = async assets => {
    const promises = [];
    const assetQuery = { _id: { $in: assets } };
    const assetDataDocuments = await stitchClient.callFunction(
        'fetchDocuments',
        [DB, ASSETS_COLLECTION, assetQuery]
    );
    assetDataDocuments.forEach(asset => {
        promises.push(saveAssetFile(asset));
    });
    return Promise.all(promises);
};

const constructDbFilter = () => ({
    page_id: { $regex: new RegExp(`^${PAGE_ID_PREFIX}/*`) },
    commit_hash: process.env.COMMIT_HASH || { $exists: false },
});

exports.sourceNodes = async () => {
    // setup env variables
    const envResults = validateEnvVariables();

    if (envResults.error) {
        throw Error(envResults.message);
    }

    // wait to connect to stitch
    await setupStitch();

    const { parserBranch, project, user } = metadata;
    PAGE_ID_PREFIX = `${project}/${user}/${parserBranch}`;
    const query = constructDbFilter();
    const documents = await stitchClient.callFunction('fetchDocuments', [
        DB,
        DOCUMENTS_COLLECTION,
        query,
    ]);
    console.log(documents);
    if (documents.length === 0) {
        console.error('No documents matched your query.');
        // process.exit(1);
    }

    documents.forEach(doc => {
        const { page_id, ...rest } = doc;
        RESOLVED_REF_DOC_MAPPING[
            page_id.replace(`${PAGE_ID_PREFIX}/`, '')
        ] = rest;
    });

    // Identify page documents and parse each document for images
    const assets = [];
    Object.entries(RESOLVED_REF_DOC_MAPPING).forEach(([key, val]) => {
        const pageNode = getNestedValue(['ast', 'children'], val);
        const filename = getNestedValue(['filename'], val) || '';
        if (pageNode) {
            assets.push(...val.static_assets);
        }
        if (key.includes('images/')) {
            IMAGE_FILES[key] = val;
        } else if (filename.endsWith('.txt')) {
            PAGES.push(key);
        }
    });

    await saveAssetFiles(assets);
};

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const metadata = await stitchClient.callFunction('fetchDocument', [
        DB,
        METADATA_COLLECTION,
        constructDbFilter(),
    ]);

    PAGES.forEach(page => {
        const pageNodes = RESOLVED_REF_DOC_MAPPING[page];

        if (pageNodes && Object.keys(pageNodes).length > 0) {
            const template = getTemplate(
                getNestedValue(['ast', 'options', 'template'], pageNodes)
            );
            const slug = getPageSlug(page);
            createPage({
                path: slug,
                component: path.resolve(`./src/templates/${template}.js`),
                context: {
                    metadata,
                    slug,
                    snootyStitchId: SNOOTY_STITCH_ID,
                    __refDocMapping: pageNodes,
                },
            });
        }
    });
};

// Prevent errors when running gatsby build caused by browser packages run in a node environment.
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /mongodb-stitch-browser-sdk/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
    actions.setWebpackConfig({
        resolve: {
            alias: {
                // Use noop file to prevent any preview-setup errors
                previewSetup: path.resolve(__dirname, 'preview/noop.js'),
                useSiteMetadata: path.resolve(
                    __dirname,
                    'src/hooks/use-site-metadata.js'
                ),
            },
        },
    });
};
