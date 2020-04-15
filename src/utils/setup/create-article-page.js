const path = require('path');
const {
    getRelatedPagesWithImages,
} = require('./get-related-pages-with-images');
const { getNestedValue } = require('../get-nested-value');
const { getPageSlug } = require('../get-page-slug');
const { getSeriesArticles } = require('../get-series-articles');
const { getTemplate } = require('../get-template');
const { SNOOTY_STITCH_ID } = require('../../build-constants');

const createArticlePage = (
    page,
    slugContentMapping,
    allSeries,
    metadata,
    createPage
) => {
    const pageNodes = slugContentMapping[page];

    if (pageNodes && Object.keys(pageNodes).length > 0) {
        const template = getTemplate(
            getNestedValue(['ast', 'options', 'template'], pageNodes)
        );
        const slug = getPageSlug(page);
        if (pageNodes.query_fields) {
            const relatedPages = getRelatedPagesWithImages(
                pageNodes,
                slugContentMapping
            );
            pageNodes['query_fields'].related = relatedPages;
        }
        const seriesArticles = getSeriesArticles(allSeries, slug);
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
                metadata,
                seriesArticles,
                slug,
                snootyStitchId: SNOOTY_STITCH_ID,
                __refDocMapping: pageNodes,
            },
        });
    }
};

module.exports = { createArticlePage };
