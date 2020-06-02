import path from 'path';
import { articles } from './src/queries/articles';
import { constructDbFilter } from './src/utils/setup/construct-db-filter';
import { initStitch } from './src/utils/setup/init-stitch';
import { saveAssetFiles } from './src/utils/setup/save-asset-files';
import { validateEnvVariables } from './src/utils/setup/validate-env-variables';
import { handleCreatePage } from './src/utils/setup/handle-create-page';
import { createArticleNode } from './src/utils/setup/create-article-node';
import { createAssetNodes } from './src/utils/setup/create-asset-nodes';
import { createTagPageType } from './src/utils/setup/create-tag-page-type';
import { getMetadata } from './src/utils/get-metadata';
import {
    DOCUMENTS_COLLECTION,
    METADATA_COLLECTION,
} from './src/build-constants';
import { createArticlePage } from './src/utils/setup/create-article-page';

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

export const onPreBootstrap = validateEnvVariables;

export const sourceNodes = async ({
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
        createArticleNode(
            doc,
            PAGE_ID_PREFIX,
            createNode,
            createContentDigest,
            slugContentMapping
        );
    });
};

export const onCreateNode = async ({ node }) => {
    if (node.internal.type === 'Asset') {
        assets.push(node.id);
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

export const createPages = async ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;
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

    createRedirect({
        fromPath: '/academia/',
        toPath: '/academia/educators',
        redirectInBrowser: true,
    });

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
export const onCreateWebpackConfig = ({ stage, loaders, actions }) => {
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

export const onCreatePage = async ({ page, actions }) =>
    handleCreatePage(
        page,
        actions,
        stitchClient,
        homeFeaturedArticles,
        learnFeaturedArticles,
        excludedLearnPageArticles
    );
