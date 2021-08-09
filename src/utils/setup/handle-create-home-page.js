import { findArticleWithSlug } from './find-articles-from-slugs';

const MAX_HOME_PAGE_FEATURED_ARTICLES = 4;

const findFeaturedItemDetails = (item, allArticles) => {
    // Currently, only articles are supported here
    // TODO: Support items of all content types
    return findArticleWithSlug(allArticles, item);
};

const getFeaturedItems = (homeFeaturedArticles, allArticles) => {
    const featuredItems = [];
    homeFeaturedArticles
        .slice(0, MAX_HOME_PAGE_FEATURED_ARTICLES)
        .forEach(item => {
            const featuredItem = findFeaturedItemDetails(item, allArticles);
            if (featuredItem) {
                featuredItems.push(featuredItem);
            }
        });
    return featuredItems;
};

export const handleCreateHomePage = async (
    page,
    actions,
    homeFeaturedArticles,
    allArticles,
    fallbackTwitchVideo
) => {
    const { createPage, deletePage } = actions;
    const featuredItems = getFeaturedItems(homeFeaturedArticles, allArticles);
    deletePage(page);
    createPage({
        ...page,
        context: {
            ...page.context,
            featuredItems,
            fallbackTwitchVideo,
        },
    });
};
