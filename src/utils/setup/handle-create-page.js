import memoizerific from 'memoizerific';
import { removeExcludedArticles } from './remove-excluded-articles';
import { removePageIfStaged } from './remove-page-if-staged';
import { getNestedValue } from '../get-nested-value';
import { getMetadata } from '../get-metadata';
import { fetchBuildTimeVideos } from './fetch-build-time-videos';

const metadata = getMetadata();
let stitchClient;

const MAX_LEARN_PAGE_FEATURED_ARTICLES = 3;
const MAX_HOME_PAGE_FEATURED_ARTICLES = 4;

const DEFAULT_FEATURED_HOME_SLUGS = [
    'how-to/nextjs-building-modern-applications',
    'how-to/python-starlette-stitch',
    'how-to/graphql-support-atlas-stitch',
    'quickstart/free-atlas-cluster',
];

const DEFAULT_FEATURED_LEARN_SLUGS = [
    'quickstart/java-setup-crud-operations',
    'how-to/golang-alexa-skills',
    'how-to/polymorphic-pattern',
];

const STAGING_PAGES = ['/academia/educators/', '/media/'];

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

export const findArticlesFromSlugs = (allArticles, articleSlugs, maxSize) => {
    const result = [];
    // If maxSize is undefined, this will return a shallow copy of articleSlugs
    articleSlugs.slice(0, maxSize).forEach((featuredSlug, i) => {
        const targetSlug = new RegExp(`^/?${featuredSlug}$`);
        const newArticle = allArticles.find(x =>
            x.query_fields.slug.match(targetSlug)
        );
        if (newArticle) {
            result.push(newArticle);
        } else {
            // This article was not found. pick an existing article and add it instead.
            result.push(allArticles[i]);
        }
    });
    return result;
};

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

export const handleCreatePage = async (
    page,
    actions,
    inheritedStitchClient,
    homeFeaturedArticles,
    learnFeaturedArticles,
    excludedLearnPageArticles
) => {
    const { createPage, deletePage } = actions;
    stitchClient = inheritedStitchClient;
    switch (page.path) {
        case '/learn/':
            const allArticles = await getAllArticles();
            const learnPageArticles = removeExcludedArticles(
                allArticles,
                excludedLearnPageArticles
            );
            const filters = await getLearnPageFilters(learnPageArticles);
            const featuredLearnArticles = findArticlesFromSlugs(
                learnPageArticles,
                learnFeaturedArticles || DEFAULT_FEATURED_LEARN_SLUGS,
                MAX_LEARN_PAGE_FEATURED_ARTICLES
            );
            const allVideos = await fetchBuildTimeVideos();
            deletePage(page);
            createPage({
                ...page,
                context: {
                    ...page.context,
                    allArticles: learnPageArticles,
                    allVideos,
                    featuredArticles: featuredLearnArticles,
                    filters,
                },
            });
            break;
        case '/':
            const featuredHomeArticles = findArticlesFromSlugs(
                await getAllArticles(),
                homeFeaturedArticles || DEFAULT_FEATURED_HOME_SLUGS,
                MAX_HOME_PAGE_FEATURED_ARTICLES
            );
            deletePage(page);
            createPage({
                ...page,
                context: {
                    ...page.context,
                    featuredArticles: featuredHomeArticles,
                },
            });
            break;
        default:
            break;
    }
    removePageIfStaged(page, deletePage, STAGING_PAGES);
};
