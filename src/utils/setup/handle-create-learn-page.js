import { findArticlesFromSlugs } from './find-articles-from-slugs';
import { getLearnPageFilters } from './get-learn-page-filters';
import { removeExcludedArticles } from './remove-excluded-articles';

const MAX_LEARN_PAGE_FEATURED_ARTICLES = 3;

export const handleCreateLearnPage = async (
    page,
    actions,
    learnFeaturedArticles,
    excludedLearnPageArticles,
    allArticles,
    allMedia
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
    const { allPodcasts, allVideos } = allMedia;
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
