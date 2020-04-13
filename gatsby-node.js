const path = require('path');
const { constructDbFilter } = require('./src/utils/setup/construct-db-filter');
const { initStitch } = require('./src/utils/setup/init-stich');
const {
    postprocessDocument,
} = require('./src/utils/setup/postprocess-document');
const { saveAssetFiles } = require('./src/utils/setup/save-asset-files');
const {
    validateEnvVariables,
} = require('./src/utils/setup/validate-env-variables');
const { onCreatePage } = require('./src/utils/setup/on-create-page');
const { createAssetNodes } = require('./src/utils/setup/create-asset-nodes');
const { createTagPageType } = require('./src/utils/setup/create-tag-page-type');
const { getMetadata } = require('./src/utils/get-metadata');
const {
    DOCUMENTS_COLLECTION,
    METADATA_COLLECTION,
} = require('./src/build-constants');
const { createArticlePage } = require('./src/utils/setup/create-article-page');

// Consolidated metadata object used to identify build and env variables
const metadata = getMetadata();

const DB = metadata.database;
const PAGE_ID_PREFIX = `${metadata.project}/${metadata.user}/${metadata.parserBranch}`;

// different types of references
const assets = [];
const pages = [];

// in-memory object with key/value = filename/document
const slugContentMapping = {};

// stich client connection
let stitchClient;

// Featured articles for home/learn pages
let homeFeaturedArticles;
let learnFeaturedArticles;

exports.onPreBootstrap = validateEnvVariables;

exports.sourceNodes = async ({
    actions: { createNode },
    createContentDigest,
}) => {
    // wait to connect to stitch
    stitchClient = await initStitch();

    const query = constructDbFilter(PAGE_ID_PREFIX);
    const documents = await stitchClient.callFunction('fetchDocuments', [
        DB,
        DOCUMENTS_COLLECTION,
        query,
    ]);
    if (documents.length === 0) {
        console.error('No documents matched your query.');
    }

    documents.forEach(doc => {
        createAssetNodes(doc, createNode, createContentDigest);
        // Mimics onCreateNode
        postprocessDocument(doc, PAGE_ID_PREFIX, pages, slugContentMapping);
    });
};

exports.onCreateNode = async ({ node }) => {
    if (node.internal.type === 'Asset') {
        assets.push(node.id);
    }
};

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const [, metadata] = await Promise.all([
        saveAssetFiles(assets, stitchClient),
        stitchClient.callFunction('fetchDocument', [
            DB,
            METADATA_COLLECTION,
            constructDbFilter(PAGE_ID_PREFIX),
        ]),
    ]);

    const allSeries = metadata.pageGroups;

    // featured aricles are in pageGroups but not series, so we remove them
    homeFeaturedArticles = allSeries.home;
    learnFeaturedArticles = allSeries.learn;
    delete allSeries.home;
    delete allSeries.learn;
    pages.forEach(page => {
        createArticlePage(
            page,
            slugContentMapping,
            allSeries,
            metadata,
            createPage
        );
    });

    const tagTypes = ['author', 'languages', 'products', 'tags', 'type'];
    const tagPages = tagTypes.map(type =>
        createTagPageType(
            type,
            createPage,
            metadata,
            slugContentMapping,
            stitchClient
        )
    );
    await Promise.all(tagPages);
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

exports.onCreatePage = async ({ page, actions }) =>
    onCreatePage(
        page,
        actions,
        stitchClient,
        homeFeaturedArticles,
        learnFeaturedArticles
    );
