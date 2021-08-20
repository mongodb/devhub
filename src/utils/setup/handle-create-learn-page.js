import { findAndFillArticlesFromSlugs } from './find-articles-from-slugs';
import { getLearnPageFilters } from './get-learn-page-filters';
import { removeExcludedArticles } from './remove-excluded-articles';

const MAX_LEARN_PAGE_FEATURED_ARTICLES = 3;

export const handleCreateLearnPage = (
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
    const filters = getLearnPageFilters(learnPageArticles);
    const featuredLearnArticles = findAndFillArticlesFromSlugs(
        learnPageArticles,
        learnFeaturedArticles,
        MAX_LEARN_PAGE_FEATURED_ARTICLES,
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
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
