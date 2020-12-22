import { findArticleWithSlug } from './find-articles-from-slugs';
import { getItemTypeFromUrl } from './get-item-type-from-url';

const MAX_HOME_PAGE_FEATURED_ARTICLES = 4;

export const handleCreateHomePage = async (
    page,
    actions,
    homeFeaturedArticles,
    allArticles
) => {
    const { createPage, deletePage } = actions;
    const featuredItems = [];
    homeFeaturedArticles
        .slice(0, MAX_HOME_PAGE_FEATURED_ARTICLES)
        .forEach(item => {
            // Currently, only articles are supported here
            // TODO: Support items of all content types
            const itemType = getItemTypeFromUrl(item);
            switch (itemType) {
                case 'article':
                    const article = findArticleWithSlug(allArticles, item);
                    if (article) {
                        featuredItems.push(article);
                    } else {
                        throw new Error(`Featured article not found: ${item}`);
                    }
                    break;
                default:
                    throw new Error(`Featured article not found: ${item}`);
            }
        });
    deletePage(page);
    createPage({
        ...page,
        context: {
            ...page.context,
            featuredItems,
        },
    });
};
