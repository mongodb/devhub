import { getOtherContentFromTheSeries } from '../../src/utils/get-other-content-from-series';

it('should properly return other content in the series', () => {
    const seriesContentMapping = {
        seriesToContentMap: {
            'series 1': {
                articles: [
                    { slug: '/podcasts/foo', title: 'foo' },
                    { slug: '/podcasts/bar', title: 'bar' },
                ],
                title: 'series 1',
            },
        },
        contentToSeriesMap: {
            '/podcasts/foo': ['series 1'],
            '/podcasts/bar': ['series 1'],
        },
    };
    const targetSlug = '/podcasts/foo';
    const otherContentInTheSeries = getOtherContentFromTheSeries(
        seriesContentMapping,
        targetSlug
    );
    expect(otherContentInTheSeries).toEqual([
        {
            articles: [
                { slug: '/podcasts/foo', title: 'foo' },
                { slug: '/podcasts/bar', title: 'bar' },
            ],
            title: 'series 1',
        },
    ]);
});
