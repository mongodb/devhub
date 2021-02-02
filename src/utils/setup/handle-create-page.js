import memoizerific from 'memoizerific';
import { fetchBuildTimeMedia } from './fetch-build-time-media';
import { removePageIfStaged } from './remove-page-if-staged';
import { getNestedValue } from '../get-nested-value';
import { getMetadata } from '../get-metadata';
import { handleCreateHomePage } from './handle-create-home-page';
import { getStagingPages } from './get-staging-pages';
import { handleCreateLearnPage } from './handle-create-learn-page';

const metadata = getMetadata();
let stitchClient;

const memoizedStagingPages = memoizerific(1)(
    async () => await getStagingPages()
);

const requestStitch = async (functionName, ...args) =>
    stitchClient.callFunction(functionName, [metadata, ...args]);
const memoizedStitchRequest = memoizerific(10)(requestStitch);

const getAllArticles = memoizerific(1)(async () => {
    const documents = await memoizedStitchRequest('fetchDevhubMetadata', {});
    // Ignore bad data, including links to the home page as an "article"
    const filteredDocuments = documents.filter(d => {
        const route = getNestedValue(['query_fields', 'slug'], d);
        const title = getNestedValue(['query_fields', 'title'], d);
        const image = getNestedValue(['query_fields', 'atf-image'], d);
        return route !== '/' && !!title && !!image;
    });
    return filteredDocuments;
});

const memoizedBuildTimeMedia = memoizerific(1)(
    async () => await fetchBuildTimeMedia()
);

export const handleCreatePage = async (
    page,
    actions,
    inheritedStitchClient,
    homeFeaturedArticles,
    learnFeaturedArticles,
    excludedLearnPageArticles
) => {
    stitchClient = inheritedStitchClient;
    const allArticles = await getAllArticles();
    const { fallbackTwitchVideo, ...allMedia } = await memoizedBuildTimeMedia();
    switch (page.path) {
        case '/learn/':
            await handleCreateLearnPage(
                page,
                actions,
                learnFeaturedArticles,
                excludedLearnPageArticles,
                allArticles,
                allMedia
            );
            break;
        case '/':
            await handleCreateHomePage(
                page,
                actions,
                homeFeaturedArticles,
                allArticles,
                fallbackTwitchVideo
            );
            break;
        default:
            const { deletePage } = actions;
            const stagingPages = await memoizedStagingPages();
            removePageIfStaged(page, deletePage, stagingPages);
            break;
    }
};
