const path = require('path');
const dlv = require('dlv');
const fs = require('fs').promises;
const mkdirp = require('mkdirp');
const { Stitch, AnonymousCredential } = require('mongodb-stitch-server-sdk');
const {
    validateEnvVariables,
} = require('./src/utils/setup/validate-env-variables');
const { getMetadata } = require('./src/utils/get-metadata');
const { getNestedValue } = require('./src/utils/get-nested-value');
const {
    getTagPageUriComponent,
} = require('./src/utils/get-tag-page-uri-component');
const { getPageSlug } = require('./src/utils/get-page-slug');
const { getSeriesArticles } = require('./src/utils/get-series-articles');
const { getTemplate } = require('./src/utils/get-template');

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

const FEATURED_LEARN_SLUGS = [
    '/how-to/introducing-graphql-support-in-mongodb-atlas-with-stitch',
    '/how-to/building-modern-applications-with-nextjs',
    '/how-to/mongodb-and-data-streaming-implementing-a-mongodb-kafka-consumer',
];

const STITCH_TYPE_TO_URL_PREFIX = {
    author: 'author',
    languages: 'language',
    products: 'product',
    tags: 'tag',
    type: 'type',
};

// in-memory object with key/value = filename/document
let RESOLVED_REF_DOC_MAPPING = {};

// stich client connection
let stitchClient;

const setupStitch = () => {
    return new Promise(resolve => {
        stitchClient = Stitch.hasAppClient(SNOOTY_STITCH_ID)
            ? Stitch.getAppClient(SNOOTY_STITCH_ID)
            : Stitch.initializeAppClient(SNOOTY_STITCH_ID);
        stitchClient.auth
            .loginWithCredential(new AnonymousCredential())
            .then(() => {
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

const createTagPageType = async (createPage, pageMetadata, stitchType) => {
    const isAuthor = stitchType === 'author';
    const pageType = STITCH_TYPE_TO_URL_PREFIX[stitchType];

    // Query for all possible values for this type of tag
    const possibleTagValues = await stitchClient.callFunction(
        'getValuesByKey',
        [metadata, stitchType]
    );

    const requests = [];

    // For each possible tag value, query the pages that exist for it
    await possibleTagValues.forEach(async tag => {
        const requestKey = {};
        requestKey[stitchType] = tag._id;
        requests.push(
            stitchClient.callFunction('fetchDevhubMetadata', [
                metadata,
                requestKey,
            ])
        );
    });

    const pageData = await Promise.all(requests);

    // Once requests finish, map the item with name (and optional image) to the response's return value
    const itemsWithPageData = possibleTagValues.map((r, i) => ({
        item: r,
        pages: pageData[i],
    }));

    const pageList = itemsWithPageData.map(page => {
        const name = isAuthor ? page.item._id.name : page.item._id;
        // Some bad data for authors doesn't follow this structure, so ignore it
        if (!name) return null;
        else {
            const urlSuffix = getTagPageUriComponent(name);
            const newPage = {
                type: pageType,
                name: name,
                slug: `/${pageType}/${urlSuffix}`,
                pages: page.pages,
            };
            if (isAuthor) {
                newPage['author_image'] = page.item._id.image;
            }
            return newPage;
        }
    });

    pageList.forEach(page => {
        if (page) {
            createPage({
                path: page.slug,
                component: path.resolve(`./src/templates/tag.js`),
                context: {
                    metadata: pageMetadata,
                    snootyStitchId: SNOOTY_STITCH_ID,
                    ...page,
                },
            });
        }
    });
};

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
    if (documents.length === 0) {
        console.error('No documents matched your query.');
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

    const allSeries = metadata.pageGroups;
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
                    metadata: metadata,
                    seriesArticles,
                    slug,
                    snootyStitchId: SNOOTY_STITCH_ID,
                    __refDocMapping: pageNodes,
                },
            });
        }
    });

    await Promise.all([
        createTagPageType(createPage, metadata, 'author'),
        createTagPageType(createPage, metadata, 'languages'),
        createTagPageType(createPage, metadata, 'products'),
        createTagPageType(createPage, metadata, 'tags'),
        createTagPageType(createPage, metadata, 'type'),
    ]);
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

const getLearnPageArticles = async () => {
    const documents = await stitchClient.callFunction('fetchDevhubMetadata', [
        metadata,
        {},
    ]);
    return documents;
};

const getFeaturedLearnArticles = articles => {
    const result = [];
    FEATURED_LEARN_SLUGS.forEach(f => {
        result.push(articles.find(x => x.query_fields.slug === f));
    });
    return result;
};

exports.onCreatePage = async ({ page, actions }) => {
    if (page.path === '/learn/') {
        const { createPage, deletePage } = actions;
        const allArticles = await getLearnPageArticles();
        const featuredArticles = getFeaturedLearnArticles(allArticles);
        deletePage(page);
        createPage({
            ...page,
            context: {
                ...page.context,
                allArticles,
                featuredArticles,
            },
        });
    }
};
