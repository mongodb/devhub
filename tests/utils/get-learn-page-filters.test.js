import { getLearnPageFilters } from '../../src/utils/setup/get-learn-page-filters';

it('should correctly create filters for the learn page based on article tags', () => {
    const allArticles = [
        {
            languages: [{ label: 'node' }, { label: 'react' }],
            products: [{ label: 'atlas' }, { label: 'stitch' }],
        },
        {
            languages: [{ label: 'python' }, { label: 'react' }],
            products: [{ label: 'server' }],
        },
        {
            languages: [{ label: 'python' }, { label: 'react' }],
            products: [{ label: 'server' }],
        },
        {
            languages: [],
            products: [{ label: 'server' }, { label: 'stitch' }],
        },
    ];

    const expectedLanguages = {
        node: {
            count: 1,
            products: {
                atlas: 1,
                stitch: 1,
            },
        },
        python: {
            count: 2,
            products: {
                server: 2,
            },
        },
        react: {
            count: 3,
            products: {
                atlas: 1,
                server: 2,
                stitch: 1,
            },
        },
    };

    const expectedProducts = {
        atlas: {
            count: 1,
            languages: {
                node: 1,
                react: 1,
            },
        },
        server: {
            count: 3,
            languages: {
                python: 2,
                react: 2,
            },
        },
        stitch: {
            count: 2,
            languages: {
                node: 1,
                react: 1,
            },
        },
    };

    const { languages, products } = getLearnPageFilters(allArticles);

    expect(languages).toStrictEqual(expectedLanguages);
    expect(products).toStrictEqual(expectedProducts);
});
