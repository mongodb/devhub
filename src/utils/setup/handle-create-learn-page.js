import memoizerific from 'memoizerific';
import { fetchBuildTimeMedia } from './fetch-build-time-media';
import { removeExcludedArticles } from './remove-excluded-articles';

const MAX_LEARN_PAGE_FEATURED_ARTICLES = 3;

export const getLearnPageFilters = allArticles => {
    const languages = {};
    const products = {};

    allArticles.forEach(article => {
        const languagesForArticle = article.query_fields.languages;
        const productsForArticle = article.query_fields.products;
        // Go through languages for this article and update filter info.
        // Add a count of how many times this language appears and keep track
        // of how many itmes we see a product with this language
        if (languagesForArticle) {
            languagesForArticle.forEach(language => {
                const currentLanguage = languages[language];
                if (currentLanguage) {
                    currentLanguage.count++;
                } else {
                    // Update language reference directly in outer block object
                    languages[language] = {
                        count: 1,
                        products: {},
                    };
                }
                if (productsForArticle) {
                    // If this article also has products, update those counts as well for this language
                    const productsForLanguage = languages[language].products;
                    productsForArticle.forEach(product => {
                        productsForLanguage[product]
                            ? productsForLanguage[product]++
                            : (productsForLanguage[product] = 1);
                    });
                }
            });
        }
        // Go through products for this article and update filter info.
        // Add a count of how many times this product appears and keep track
        // of how many itmes we see a language with this product
        if (productsForArticle) {
            productsForArticle.forEach(product => {
                const currentProduct = products[product];
                if (currentProduct) {
                    currentProduct.count++;
                } else {
                    // Update product reference directly in outer block object
                    products[product] = {
                        count: 1,
                        languages: {},
                    };
                }
                if (languagesForArticle) {
                    // If this article also has languages, update those counts as well for this products
                    const languagesForProduct = products[product].languages;
                    languagesForArticle.forEach(language => {
                        languagesForProduct[language]
                            ? languagesForProduct[language]++
                            : (languagesForProduct[language] = 1);
                    });
                }
            });
        }
    });
    return { languages, products };
};

const findArticleWithSlug = (allArticles, slug) => {
    const targetSlug = new RegExp(`^/?${slug}$`);
    const targetArticle = allArticles.find(x =>
        x.query_fields.slug.match(targetSlug)
    );
    if (targetArticle) {
        targetArticle['type'] = 'article';
        return targetArticle;
    }
};

export const findArticlesFromSlugs = (allArticles, articleSlugs, maxSize) => {
    const result = [];
    // If maxSize is undefined, this will return a shallow copy of articleSlugs
    articleSlugs.slice(0, maxSize).forEach((featuredSlug, i) => {
        const targetArticle = findArticleWithSlug(allArticles, featuredSlug);
        if (targetArticle) {
            result.push(targetArticle);
        } else {
            // This article was not found. pick an existing article and add it instead.
            result.push(allArticles[i]);
        }
    });
    return result;
};

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
