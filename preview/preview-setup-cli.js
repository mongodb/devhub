/* eslint-disable no-console */
const { App, Credentials } = require('realm-web');
const {
    validateEnvVariables,
} = require('../src/utils/setup/validate-env-variables');
const { getIncludeFile } = require('./get-include-file');
const { getNestedValue } = require('../src/utils/get-nested-value');
const { getTemplate } = require('../src/utils/get-template');
const { getGuideMetadata } = require('../src/utils/get-guide-metadata');
const { getPageSlug } = require('../src/utils/get-page-slug');

// Atlas DB config
const DB = 'snooty';
const DOCUMENTS_COLLECTION = 'documents';
const ASSETS_COLLECTION = 'assets';
const SNOOTY_STITCH_ID = 'snooty-koueq';

// different types of references
const PAGES = [];
const INCLUDE_FILES = {};
const GUIDES_METADATA = {};

// in-memory object with key/value = filename/document
const RESOLVED_REF_DOC_MAPPING = {};

// stich client connection
let appUser;

const setupStitch = () => {
    if (!isBrowser()) {
        return {};
    }
    const app = new App({ id: SNOOTY_STITCH_ID });
    const credentials = Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        return user;
    } catch (error) {
        console.error(error);
    }
};

// For each include node found in a page, set its 'children' property to be the array of include contents
const populateIncludeNodes = nodes => {
    const replaceInclude = node => {
        if (node.name === 'include') {
            const includeFilename = getNestedValue(
                ['argument', 0, 'value'],
                node
            );
            const includeNode = getIncludeFile(INCLUDE_FILES, includeFilename);
            // Perform the same operation on include nodes inside this include file
            const replacedInclude = includeNode.map(replaceInclude);
            // eslint-disable-next-line no-param-reassign
            node.children = replacedInclude;
        } else if (node.children) {
            node.children.forEach(replaceInclude);
        }
        return node;
    };
    return nodes.map(replaceInclude);
};

const sourceNodes = async () => {
    // setup env variables
    const envResults = validateEnvVariables();

    if (envResults.error) {
        throw Error(envResults.message);
    }

    // wait to connect to stitch
    appUser = await setupStitch();

    // start from index document
    const idPrefix = `${process.env.GATSBY_SITE}/${process.env.GATSBY_PARSER_USER}/${process.env.GATSBY_PARSER_BRANCH}`;
    const query = { _id: { $regex: new RegExp(`${idPrefix}/*`) } };
    const documents = await appUser.functions.fetchDocuments(DB, DOCUMENTS_COLLECTION, query);
    documents.forEach(doc => {
        const { _id, ...rest } = doc;
        RESOLVED_REF_DOC_MAPPING[_id.replace(`${idPrefix}/`, '')] = rest;
    });

    // Identify page documents and parse each document for images
    Object.entries(RESOLVED_REF_DOC_MAPPING).forEach(([key, val]) => {
        if (key.includes('includes/')) {
            INCLUDE_FILES[key] = val;
        } else if (!key.includes('curl') && !key.includes('https://')) {
            PAGES.push(key);
            GUIDES_METADATA[key] = getGuideMetadata(val);
        }
    });
};

// Similar to gatsby-node's createPage(). Return the data needed by a single page
export const getPageData = async () => {
    await sourceNodes();
    const page = process.env.PREVIEW_PAGE;
    const pageNodes = RESOLVED_REF_DOC_MAPPING[page];

    pageNodes.ast.children = populateIncludeNodes(
        getNestedValue(['ast', 'children'], pageNodes)
    );

    const template = getTemplate(page, process.env.GATSBY_SITE);
    const slug = getPageSlug(page);

    if (
        RESOLVED_REF_DOC_MAPPING[page] &&
        Object.keys(RESOLVED_REF_DOC_MAPPING[page]).length > 0
    ) {
        return {
            path: slug,
            template,
            context: {
                slug,
                snootyStitchId: SNOOTY_STITCH_ID,
                __refDocMapping: pageNodes,
                guidesMetadata: GUIDES_METADATA,
            },
        };
    }
    return null;
};

// Use checksum from a Figure component to return base64 data of image
export const getBase64Uri = async checksum => {
    const query = { _id: { $eq: checksum } };
    const [assetData] = await appUser.functions.fetchDocuments(DB, ASSETS_COLLECTION, query)

    const base64 = assetData.data.buffer.toString('base64');
    const fileFormat = assetData.filename.split('.')[-1];
    const prefix = `data:image/${fileFormat};base64,`;
    return prefix.concat(base64);
};
