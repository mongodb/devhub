import { getRelatedPagesWithImages } from '../../src/utils/setup/get-related-pages-with-images';

it('should get pages and images for posts related to an article', () => {
    const articleData = {
        '/foo': {
            query_fields: {
                'atf-image': 'IMAGE_FILE',
            },
        },
        '/bar': {
            query_fields: {},
        },
    };
    const blankArticle = {
        query_fields: {},
    };
    const articleWithRelatedImage = {
        query_fields: {
            related: [{ target: '/foo' }],
        },
    };
    const articleWithoutRelatedImage = {
        query_fields: {
            related: [{ target: '/bar' }],
        },
    };

    expect(getRelatedPagesWithImages(blankArticle, articleData)).toEqual([]);
    expect(
        getRelatedPagesWithImages(articleWithRelatedImage, articleData)[0].image
    ).toBe(articleData['/foo'].query_fields['atf-image']);
    expect(
        getRelatedPagesWithImages(articleWithoutRelatedImage, articleData)[0]
            .image
    ).toBeNull();
});
