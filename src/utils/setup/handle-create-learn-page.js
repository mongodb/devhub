import memoizerific from 'memoizerific';
import { fetchBuildTimeMedia } from './fetch-build-time-media';
import { findArticlesFromSlugs } from './find-articles-from-slugs';
import { getLearnPageFilters } from './get-learn-page-filters';
import { removeExcludedArticles } from './remove-excluded-articles';

const MAX_LEARN_PAGE_FEATURED_ARTICLES = 3;

const memoizedBuildTimeMedia = memoizerific(1)(
    async () => await fetchBuildTimeMedia()
);

export const handleCreateLearnPage = async (
    page,
    actions,
    learnFeaturedArticles,
    excludedLearnPageArticles,
    allArticles
) => {
    const { createPage, deletePage } = actions;
    const learnPageArticles = removeExcludedArticles(
        allArticles,
        excludedLearnPageArticles
    );
    const filters = await getLearnPageFilters(learnPageArticles);
    const featuredLearnArticles = findArticlesFromSlugs(
        learnPageArticles,
        learnFeaturedArticles,
        MAX_LEARN_PAGE_FEATURED_ARTICLES
    );
    const { allPodcasts, allVideos } = await memoizedBuildTimeMedia();
    deletePage(page);
    createPage({
        ...page,
        context: {
            ...page.context,
            allArticles: learnPageArticles,
            allPodcasts,
            allVideos,
            featuredArticles: featuredLearnArticles,
            filters,
        },
    });
};
