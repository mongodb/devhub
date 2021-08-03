import { getSeriesArticles } from '../../src/utils/get-series-articles';

it('should correctly determine which series an article belongs to', () => {
    const seriesABC = {
        title: 'seriesABC',
        articles: [{ slug: 'slugA' }, { slug: 'slugB' }, { slug: 'slugC' }],
    };
    const seriesAC = {
        title: 'seriesAC',
        articles: [{ slug: 'slugA' }, { slug: 'slugC' }],
    };
    const seriesB = {
        title: 'seriesB',
        articles: [{ slug: 'slugB' }],
    };
    const seriesD = { title: 'seriesD', articles: [] };
    const allSeries = [seriesABC, seriesAC, seriesB, seriesD];
    expect(getSeriesArticles(allSeries, 'slugA')).toEqual([
        seriesABC,
        seriesAC,
    ]);
    expect(getSeriesArticles(allSeries, 'slugB')).toEqual([seriesABC, seriesB]);
    expect(getSeriesArticles(allSeries, 'slugC')).toEqual([
        seriesABC,
        seriesAC,
    ]);
    expect(getSeriesArticles(allSeries, 'slugD')).toEqual([]);
    expect(getSeriesArticles(allSeries, '')).toEqual([]);
});
