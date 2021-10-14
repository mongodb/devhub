import { findAndFillArticlesFromSlugs } from './find-and-fill-articles-from-slugs';

const MAX_HOME_PAGE_FEATURED_ARTICLES = 4;

const getFeaturedItems = (homeFeaturedArticles, allArticles) =>
    findAndFillArticlesFromSlugs(
        allArticles,
        homeFeaturedArticles,
        MAX_HOME_PAGE_FEATURED_ARTICLES,
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    );

export const handleCreateHomePage = async (
    page,
    actions,
    homeFeaturedArticles,
    allArticles,
    fallbackTwitchVideo
) => {
    const { createPage, deletePage } = actions;
    // Featured items are not needed for preview mode.
    const featuredItems = Boolean(process.env.GATSBY_PREVIEW_MODE)
        ? []
        : getFeaturedItems(homeFeaturedArticles, allArticles);
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
