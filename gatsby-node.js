const path = require('path');
const { articles } = require('./src/queries/articles');
const { constructDbFilter } = require('./src/utils/setup/construct-db-filter');
const { initStitch } = require('./src/utils/setup/init-stich');
const { saveAssetFiles } = require('./src/utils/setup/save-asset-files');
const {
    validateEnvVariables,
} = require('./src/utils/setup/validate-env-variables');
const { onCreatePage } = require('./src/utils/setup/on-create-page');
const { createArticleNode } = require('./src/utils/setup/create-article-node');
const { createAssetNodes } = require('./src/utils/setup/create-asset-nodes');
const { createTagPageType } = require('./src/utils/setup/create-tag-page-type');
const { getMetadata } = require('./src/utils/get-metadata');
const { METADATA_COLLECTION } = require('./src/build-constants');
const { createArticlePage } = require('./src/utils/setup/create-article-page');

// Consolidated metadata object used to identify build and env variables
const metadata = getMetadata();

const DB = metadata.database;
const PAGE_ID_PREFIX = `${metadata.project}/${metadata.user}/${metadata.parserBranch}`;

// different types of references
const assets = [];

// in-memory object with key/value = filename/document
const slugContentMapping = {};

// stich client connection
let stitchClient;

// Featured articles for home/learn pages
let homeFeaturedArticles;
let learnFeaturedArticles;

// Excluded articles from the learn page
let excludedLearnPageArticles;

exports.onPreBootstrap = validateEnvVariables;

exports.onCreateNode = async ({
    actions: { createNode, deleteNode },
    createContentDigest,
    node,
}) => {
    if (node.internal.type === 'Asset') {
        assets.push(node.id);
    }
    if (node.internal.type === 'StitchArticle') {
        deleteNode(node);
        createAssetNodes(node, createNode, createContentDigest);
        createArticleNode(
            node,
            PAGE_ID_PREFIX,
            createNode,
            createContentDigest,
            slugContentMapping
        );
    }
};

const filteredPageGroups = allSeries => {
    // featured articles are in pageGroups but not series, so we remove them
    homeFeaturedArticles = allSeries.home;
    learnFeaturedArticles = allSeries.learn;
    // also remove a group of excluded articles
    excludedLearnPageArticles = allSeries.learnPageExclude;
    delete allSeries.home;
    delete allSeries.learn;
    delete allSeries.learnPageExclude;
    return allSeries;
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    stitchClient = await initStitch();
    const [, metadata, result] = await Promise.all([
        saveAssetFiles(assets, stitchClient),
        stitchClient.callFunction('fetchDocument', [
            DB,
            METADATA_COLLECTION,
            constructDbFilter(PAGE_ID_PREFIX),
        ]),
        graphql(articles),
    ]);

    if (result.error) {
        throw new Error(`Page build error: ${result.error}`);
    }

    const allSeries = filteredPageGroups(metadata.pageGroups);

    result.data.allArticle.nodes.forEach(article => {
        createArticlePage(
            article.slug,
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
        learnFeaturedArticles,
        excludedLearnPageArticles
    );
