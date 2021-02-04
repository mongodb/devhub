import { getLearnPageFilters } from './get-learn-page-filters';
import { removeExcludedArticles } from './remove-excluded-articles';

export const handleCreateLearnPage = async (
    page,
    actions,
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
    const { allPodcasts, allVideos } = allMedia;
    deletePage(page);
    createPage({
        ...page,
        context: {
            ...page.context,
            allArticles: learnPageArticles,
            allPodcasts,
            allVideos,
            filters,
        },
    });
};
