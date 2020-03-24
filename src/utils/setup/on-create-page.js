const memoizerific = require('memoizerific');
const { getNestedValue } = require('../get-nested-value');
const { getMetadata } = require('../get-metadata');

const metadata = getMetadata();
let stitchClient;

const DEFAULT_FEATURED_HOME_SLUGS = [
    '/how-to/nextjs-building-modern-applications',
    '/how-to/python-starlette-stitch',
    '/how-to/graphql-support-atlas-stitch',
    '/quickstart/free-atlas-cluster',
];

const DEFAULT_FEATURED_LEARN_SLUGS = [
    '/quickstart/java-setup-crud-operations',
    '/how-to/golang-alexa-skills',
    '/how-to/polymorphic-pattern',
];

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

const findArticlesFromSlugs = (allArticles, articleSlugs) => {
    const result = [];
    articleSlugs.forEach((featuredSlug, i) => {
        const newArticle = allArticles.find(
            x => x.query_fields.slug === featuredSlug
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

const getLearnPageFilters = async () => {
    const filters = {
        languages: {},
        products: {},
    };

    // Get possible language and product values from Stitch
    const languageValues = await stitchClient.callFunction('getValuesByKey', [
        metadata,
        'languages',
    ]);
    const productValues = await stitchClient.callFunction('getValuesByKey', [
        metadata,
        'products',
    ]);

    // For each language, build an object with its total count, and count for each product
    for (let i = 0; i < languageValues.length; i++) {
        const l = languageValues[i];
        filters.languages[l._id] = {
            count: l.count,
            products: {},
        };
        const productValuesForLanguage = await stitchClient.callFunction(
            'getValuesByKey',
            [metadata, 'products', { languages: l._id }]
        );
        productValuesForLanguage.forEach(pl => {
            filters.languages[l._id].products[pl._id] = pl.count;
        });
    }

    // For each product, build an object with its total count, and count for each language
    for (let i = 0; i < productValues.length; i++) {
        const p = productValues[i];
        filters.products[p._id] = {
            count: p.count,
            languages: {},
        };
        const languageValuesForProduct = await stitchClient.callFunction(
            'getValuesByKey',
            [metadata, 'languages', { products: p._id }]
        );
        languageValuesForProduct.forEach(lp => {
            filters.products[p._id].languages[lp._id] = lp.count;
        });
    }
    return filters;
};

const onCreatePage = async (
    page,
    actions,
    inheritedStitchClient,
    homeFeaturedArticles,
    learnFeaturedArticles
) => {
    const { createPage, deletePage } = actions;
    stitchClient = inheritedStitchClient;
    switch (page.path) {
        case '/learn/':
            const allArticles = await getAllArticles();
            const filters = await getLearnPageFilters(allArticles);
            const featuredLearnArticles = findArticlesFromSlugs(
                allArticles,
                learnFeaturedArticles || DEFAULT_FEATURED_LEARN_SLUGS
            );
            deletePage(page);
            createPage({
                ...page,
                context: {
                    ...page.context,
                    allArticles,
                    featuredArticles: featuredLearnArticles,
                    filters,
                },
            });
            break;
        case '/':
            const featuredHomeArticles = findArticlesFromSlugs(
                await getAllArticles(),
                homeFeaturedArticles || DEFAULT_FEATURED_HOME_SLUGS
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
};

module.exports = { onCreatePage };
