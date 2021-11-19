import { getSeriesAndContentMapping } from '../../src/utils/get-mediaseries-content-maps';

it('should properly populate series to content and content to series maps', () => {
    const series = [
        {
            title: 'series 1',
            seriesEntry: [
                {
                    podcast: {
                        title: 'foo',
                        slug: '/podcasts/foo',
                    },
                },
                {
                    podcast: {
                        title: 'bar',
                        slug: '/podcasts/bar',
                    },
                },
            ],
        },
    ];
    const seriesContentMapping = getSeriesAndContentMapping(series, 'podcast');

    expect(seriesContentMapping.seriesToContentMap).toEqual({
        'series 1': {
            articles: [
                { slug: '/podcasts/foo', title: 'foo' },
                { slug: '/podcasts/bar', title: 'bar' },
            ],
            title: 'series 1',
        },
    });
    expect(seriesContentMapping.contentToSeriesMap).toEqual({
        '/podcasts/foo': ['series 1'],
        '/podcasts/bar': ['series 1'],
    });
});
