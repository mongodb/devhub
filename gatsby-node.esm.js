import path from 'path';
import { articles } from './src/queries/articles';
import { constructDbFilter } from './src/utils/setup/construct-db-filter';
import { initStitch } from './src/utils/setup/init-stitch';
import { saveAssetFiles } from './src/utils/setup/save-asset-files';
import { validateEnvVariables } from './src/utils/setup/validate-env-variables';
import { handleCreatePage } from './src/utils/setup/handle-create-page';
import { createArticleNode } from './src/utils/setup/create-article-node';
import { createAssetNodes } from './src/utils/setup/create-asset-nodes';
import { createStrapiAuthorPages } from './src/utils/setup/create-strapi-author-pages';
import { createProjectPages } from './src/utils/setup/create-project-pages';
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
const PAGE_ID_PREFIX = `${metadata.project}/${metadata.parserUser}/${metadata.parserBranch}`;

// different types of references
const assets = {};

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

    const query = constructDbFilter(
        PAGE_ID_PREFIX,
        metadata.commitHash,
        metadata.patchId
    );

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

// Snooty Parser v0.7.0 introduced a fileid keyword that is passed as a string for the includes directive
// Gatsby does not look at the directive name, it just checks the overall shape and so this causes Gatsby to think something is off when it is actually fine since we case on the directive
// We can ignore the provided type warning on the context because the directives are distinct
export const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type SitePage implements Node @dontInfer {
        path: String
    }
    `;
    createTypes(typeDefs);
};

export const onCreateNode = async ({ node }) => {
    if (node.internal.type === 'Asset') {
        assets[node.id] = node.paths;
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
    const { createPage } = actions;
    const [, metadataDocument, result] = await Promise.all([
        saveAssetFiles(assets, stitchClient),
        stitchClient.callFunction('fetchDocument', [
            DB,
            METADATA_COLLECTION,
            constructDbFilter(
                PAGE_ID_PREFIX,
                metadata.commitHash,
                metadata.patchId
            ),
        ]),
        graphql(articles),
    ]);

    await createProjectPages(createPage, graphql);

    if (result.error) {
        throw new Error(`Page build error: ${result.error}`);
    }

    const allSeries = filteredPageGroups(metadataDocument.pageGroups);

    result.data.allArticle.nodes.forEach(article => {
        createArticlePage(
            article.slug,
            slugContentMapping,
            allSeries,
            metadataDocument,
            createPage
        );
    });

    const tagTypes = ['author', 'languages', 'products', 'tags', 'type'];
    const tagPages = tagTypes.map(type =>
        createTagPageType(
            type,
            createPage,
            metadataDocument,
            slugContentMapping,
            stitchClient
        )
    );
    await Promise.all(tagPages);
    await createStrapiAuthorPages(createPage, metadataDocument, graphql);
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
