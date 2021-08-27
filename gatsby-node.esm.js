import path from 'path';
import { articles } from './src/queries/articles';
import { getStrapiArticleSeriesFromGraphql } from './src/utils/setup/get-strapi-article-series-from-graphql';
import { constructDbFilter } from './src/utils/setup/construct-db-filter';
import { initStitch } from './src/utils/setup/init-stitch';
import { saveAssetFiles } from './src/utils/setup/save-asset-files';
import { validateEnvVariables } from './src/utils/setup/validate-env-variables';
import { handleCreatePage } from './src/utils/setup/handle-create-page';
import { createArticleNode } from './src/utils/setup/create-article-node';
import { createAssetNodes } from './src/utils/setup/create-asset-nodes';
import { createProjectPages } from './src/utils/setup/create-project-pages';
import { createClientSideRedirects } from './src/utils/setup/create-client-side-redirects';
import { aggregateItemsWithTagType } from './src/utils/setup/aggregate-items-with-tag-type';
import { aggregateAuthorInformation } from './src/utils/setup/aggregate-author-information';
import { createTagPageType } from './src/utils/setup/create-tag-page-type';
import { removeDuplicatedArticles } from './src/utils/setup/remove-duplicated-articles';
import { BuildError } from './src/classes/build-error';
import { getMetadata } from './src/utils/get-metadata';
import {
    DOCUMENTS_COLLECTION,
    METADATA_COLLECTION,
} from './src/build-constants';
import { createArticlePage } from './src/utils/setup/create-article-page';
import { getStrapiArticleListFromGraphql } from './src/utils/setup/get-strapi-article-list-from-graphql';
import { schemaCustomization } from './src/utils/setup/schema-customization';
import { SnootyArticle } from './src/classes/snooty-article';
import { createVideoPages } from './src/utils/setup/create-video-pages';
import { fetchBuildTimeMedia } from './src/utils/setup/fetch-build-time-media';
import { aggregateItemsByVideoType } from './src/utils/setup/aggregate-items-by-video-type';
import { createCommunityChampionProfilePages } from './src/utils/setup/create-community-champion-profile-pages';
import { aggregateItemsByAudioType } from './src/utils/setup/aggregate-items-by-audio-type';
import { createPodcastPages } from './src/utils/setup/create-podcast-pages';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const pluralizeIfNeeded = {
    author: 'authors',
    language: 'languages',
    product: 'products',
    tag: 'tags',
    type: 'type',
};

// Consolidated metadata object used to identify build and env variables
const metadata = getMetadata();

const DB = metadata.database;
const PAGE_ID_PREFIX = `${metadata.project}/${metadata.parserUser}/${metadata.parserBranch}`;

// different types of references
const assets = {};

// in-memory object with key/value = filename/document
const slugContentMapping = {};

let snootyArticles = [];
let allArticles = [];
// Create slimmer articles for tag pages
let articlesWithoutContentAST = [];

// stich client connection
let stitchClient;

// Featured articles for home/learn pages
let homeFeaturedArticles;
let learnFeaturedArticles;

// Excluded articles from the learn page
let excludedLearnPageArticles;

export const onPreBootstrap = validateEnvVariables;

export const sourceNodes = async ({
    actions,
    createContentDigest,
    pathPrefix,
}) => {
    const { createNode } = actions;
    // wait to connect to stitch
    stitchClient = await initStitch();

    const query = constructDbFilter(
        PAGE_ID_PREFIX,
        metadata.commitHash,
        metadata.patchId
    );

    const documents = await stitchClient.callFunction('fetchDevhubDocuments', [
        DB,
        DOCUMENTS_COLLECTION,
        query,
    ]);
    if (documents.length === 0) {
        new BuildError('No documents matched your query.');
    }

    documents.forEach(doc => {
        const rawContent = doc.source;
        // We use the source for search RSS XML but do not want it in page data
        delete doc.source;
        createAssetNodes(doc, createNode, createContentDigest);
        createArticleNode(
            doc,
            PAGE_ID_PREFIX,
            createNode,
            createContentDigest,
            slugContentMapping,
            rawContent,
            snootyArticles
        );
    });
    // This must be done after so all author bios exist
    snootyArticles = snootyArticles.map(
        ({ slug, doc }) =>
            new SnootyArticle(slug, doc, slugContentMapping, pathPrefix)
    );
};

// Snooty Parser v0.7.0 introduced a fileid keyword that is passed as a string for the includes directive
// Gatsby does not look at the directive name, it just checks the overall shape and so this causes Gatsby to think something is off when it is actually fine since we case on the directive
// We can ignore the provided type warning on the context because the directives are distinct
export const createSchemaCustomization = schemaCustomization;

export const onCreateNode = async ({ node }) => {
    if (node.internal.type === 'Asset') {
        assets[node.id] = node.paths;
    }
};

const filterPageGroups = allSeries => {
    // featured articles are in pageGroups but not series, so we remove them
    homeFeaturedArticles = allSeries.home;
    learnFeaturedArticles = allSeries.learn;
    // also remove a group of excluded articles
    excludedLearnPageArticles = allSeries.learnPageExclude;
};

export const createPages = async ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;
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

    filterPageGroups(metadataDocument.pageGroups);
    const articleSeries = await getStrapiArticleSeriesFromGraphql(
        graphql,
        slugContentMapping
    );
    const strapiArticleList = await getStrapiArticleListFromGraphql(graphql);
    allArticles = removeDuplicatedArticles(snootyArticles, strapiArticleList);

    allArticles.forEach(article => {
        createArticlePage(
            article,
            slugContentMapping,
            articleSeries,
            metadataDocument,
            createPage
        );
    });

    articlesWithoutContentAST = allArticles.map(a => ({
        ...a,
        contentAST: [],
        SEO: {},
    }));

    await createClientSideRedirects(graphql, createRedirect);
    const { allVideos, allPodcasts } = await fetchBuildTimeMedia();
    const tagPageDirectory = {};
    const tagTypes = ['author', 'language', 'product', 'tag', 'type'];
    tagTypes.forEach(type => {
        const isAuthorType = type === 'author';
        if (isAuthorType) {
            tagPageDirectory[type] = aggregateAuthorInformation(
                articlesWithoutContentAST
            );
        } else {
            const mappedType = pluralizeIfNeeded[type];
            tagPageDirectory[type] = aggregateItemsWithTagType(
                articlesWithoutContentAST,
                mappedType,
                type !== mappedType
            );
        }
    });

    const aggregateVideoItems = aggregateItemsByVideoType(allVideos);
    Object.keys(aggregateVideoItems).forEach(key => {
        tagPageDirectory['type'][key] = aggregateVideoItems[key];
    });

    const aggregateAudioItems = aggregateItemsByAudioType(allPodcasts);
    Object.keys(aggregateAudioItems).forEach(key => {
        tagPageDirectory['type'][key] = aggregateAudioItems[key];
    });

    const tagPages = tagTypes.map(type => {
        createTagPageType(type, createPage, tagPageDirectory, metadataDocument);
    });
    await Promise.all(tagPages);

    await createVideoPages(createPage, allVideos, metadataDocument);

    await createCommunityChampionProfilePages(createPage, graphql);

    await createPodcastPages(createPage, allPodcasts, metadataDocument);
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
        plugins: [new NodePolyfillPlugin()],
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
        articlesWithoutContentAST,
        homeFeaturedArticles,
        learnFeaturedArticles,
        excludedLearnPageArticles
    );
