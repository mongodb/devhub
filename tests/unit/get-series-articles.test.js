import { getSeriesArticles } from '../../src/utils/get-series-articles';

it('should correctly determine which series an article belongs to', () => {
    const allSeries = {
        seriesABC: ['slugA', 'slugB', 'slugC'],
        seriesAC: ['slugA', 'slugC'],
        seriesB: ['slugB'],
        seriesD: [],
    };
    expect(Object.keys(getSeriesArticles(allSeries, 'slugA'))).toEqual([
        'seriesABC',
        'seriesAC',
    ]);
    expect(getSeriesArticles(allSeries, 'slugA')['seriesAC']).toEqual(
        allSeries['seriesAC']
    );
    expect(Object.keys(getSeriesArticles(allSeries, 'slugB'))).toEqual([
        'seriesABC',
        'seriesB',
    ]);
    expect(Object.keys(getSeriesArticles(allSeries, 'slugC'))).toEqual([
        'seriesABC',
        'seriesAC',
    ]);
    expect(Object.keys(getSeriesArticles(allSeries, 'slugD'))).toEqual([]);
    expect(Object.keys(getSeriesArticles(allSeries, ''))).toEqual([]);
});
