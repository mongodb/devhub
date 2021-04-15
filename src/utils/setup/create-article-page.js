import path from 'path';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
import { getNestedValue } from '../get-nested-value';
import { getPageSlug } from '../get-page-slug';
import { getSeriesArticles } from '../get-series-articles';
import { getTemplate } from '../get-template';
import { SNOOTY_STITCH_ID } from '../../build-constants';

export const createArticlePage = async (
    { slug: page, associations, ...rest },
    slugContentMapping,
    allSeries,
    metadata,
    createPage,
    ttrFunction
) => {
    const pageNodes = slugContentMapping[page];
    if (pageNodes && Object.keys(pageNodes).length > 0) {
        const template = getTemplate(
            getNestedValue(['ast', 'options', 'template'], pageNodes)
        );
        const slug = getPageSlug(page);
        let mappedAssociations = [];
        if (pageNodes.query_fields) {
            mappedAssociations = await getRelatedPagesWithImages(
                pageNodes,
                slugContentMapping,
                associations,
                ttrFunction
            );
        }
        const seriesArticles = getSeriesArticles(allSeries, slug);
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
                associations: mappedAssociations,
                metadata,
                seriesArticles,
                slug,
                snootyStitchId: SNOOTY_STITCH_ID,
                __refDocMapping: pageNodes,
                ...rest,
            },
        });
    }
};
