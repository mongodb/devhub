import path from 'path';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
import { getNestedValue } from '../get-nested-value';
import { getPageSlug } from '../get-page-slug';
import { getSeriesArticles } from '../get-series-articles';
import { getTemplate } from '../get-template';
import { SNOOTY_STITCH_ID } from '../../build-constants';

export const createArticlePage = (
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
