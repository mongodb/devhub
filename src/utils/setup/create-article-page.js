import path from 'path';
import { getRelatedPagesWithImages } from './get-related-pages-with-images';
import { getPageSlug } from '../get-page-slug';
import { getSeriesArticles } from '../get-series-articles';
import { SNOOTY_STITCH_ID } from '../../build-constants';

export const createArticlePage = (
    articleInstance,
    slugContentMapping,
    allSeries,
    metadata,
    createPage
) => {
    const slug = getPageSlug(articleInstance.slug);
    articleInstance.related = getRelatedPagesWithImages(
        articleInstance.related,
        slugContentMapping
    );
    console.log(articleInstance);
    const seriesArticles = getSeriesArticles(allSeries, slug);
    createPage({
        path: slug,
        component: path.resolve(`./src/templates/article.js`),
        context: {
            metadata,
            seriesArticles,
            slug,
            snootyStitchId: SNOOTY_STITCH_ID,
            article: articleInstance,
        },
    });
};
