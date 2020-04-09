const path = require('path');
const dlv = require('dlv');
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
const { createTagPageType } = require('./src/utils/setup/create-tag-page-type');
const { getMetadata } = require('./src/utils/get-metadata');
const { getNestedValue } = require('./src/utils/get-nested-value');
const { getPageSlug } = require('./src/utils/get-page-slug');
const { getSeriesArticles } = require('./src/utils/get-series-articles');
const { getTemplate } = require('./src/utils/get-template');
const {
    DOCUMENTS_COLLECTION,
    METADATA_COLLECTION,
    SNOOTY_STITCH_ID,
} = require('./src/build-constants');

// Consolidated metadata object used to identify build and env variables
const metadata = getMetadata();

const DB = metadata.database;
const PAGE_ID_PREFIX = `${metadata.project}/${metadata.user}/${metadata.parserBranch}`;

// different types of references
const PAGES = [];

// in-memory object with key/value = filename/document
let RESOLVED_REF_DOC_MAPPING = {};

// stich client connection
let stitchClient;

// Featured articles for home/learn pages
let homeFeaturedArticles;
let learnFeaturedArticles;

const getRelatedPagesWithImages = pageNodes => {
    const related = dlv(pageNodes, 'query_fields.related', []);
    const relatedPageInfo = related.map(r => ({
        image: dlv(
            RESOLVED_REF_DOC_MAPPING,
            [r.target, 'query_fields', 'atf-image'],
            null
        ),
        ...r,
    }));
    return relatedPageInfo;
};

exports.onPreBootstrap = validateEnvVariables;

exports.sourceNodes = async () => {
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

    const assets = [];
    documents.forEach(doc => {
        // Mimics onCreateNode
        postprocessDocument(
            doc,
            PAGE_ID_PREFIX,
            assets,
            PAGES,
            RESOLVED_REF_DOC_MAPPING
        );
    });

    await saveAssetFiles(assets, stitchClient);
};

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    const metadata = await stitchClient.callFunction('fetchDocument', [
        DB,
        METADATA_COLLECTION,
        constructDbFilter(PAGE_ID_PREFIX),
    ]);

    const allSeries = metadata.pageGroups;

    // featured aricles are in pageGroups but not series, so we remove them
    homeFeaturedArticles = allSeries.home;
    learnFeaturedArticles = allSeries.learn;
    delete allSeries.home;
    delete allSeries.learn;
    PAGES.forEach(page => {
        const pageNodes = RESOLVED_REF_DOC_MAPPING[page];

        if (pageNodes && Object.keys(pageNodes).length > 0) {
            const template = getTemplate(
                getNestedValue(['ast', 'options', 'template'], pageNodes)
            );
            const slug = getPageSlug(page);
            if (pageNodes.query_fields) {
                const relatedPages = getRelatedPagesWithImages(pageNodes);
                pageNodes['query_fields'].related = relatedPages;
            }
            const seriesArticles = getSeriesArticles(allSeries, slug);
            createPage({
                path: slug,
                component: path.resolve(`./src/templates/${template}.js`),
                context: {
                    metadata,
                    seriesArticles,
                    slug,
                    snootyStitchId: SNOOTY_STITCH_ID,
                    __refDocMapping: pageNodes,
                },
            });
        }
    });

    const tagTypes = ['author', 'languages', 'products', 'tags', 'type'];
    const tagPages = tagTypes.map(type =>
        createTagPageType(
            type,
            createPage,
            metadata,
            RESOLVED_REF_DOC_MAPPING,
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
