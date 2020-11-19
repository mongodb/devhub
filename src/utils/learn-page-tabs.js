/**
 * Enums are not supported in JS, only TS. Since we are not on TS, we can
 * freeze an object to effectively create an enum.
 */
export const LearnPageTabs = Object.freeze({
    all: 'All',
    articles: 'Articles',
    podcasts: 'Podcasts',
    videos: 'Videos',
});
