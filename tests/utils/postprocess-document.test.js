import { postprocessDocument } from '../../src/utils/setup/postprocess-document';

describe('Should properly postprocess a document node after it is fetched', () => {
    const articleSlug = 'article/test-article';
    const articleNodeContent = {
        ast: {
            children: [],
        },
        filename: `${articleSlug}.txt`,
        static_assets: ['STATIC_ASSET'],
    };
    const imageSlug = 'image/test-image';
    const imageNodeContent = {
        ast: {
            children: [],
        },
        filename: `${imageSlug}.png`,
        static_assets: [],
    };

    it('should properly add an asset to the in-memory assets array', () => {
        const assets = [];
        postprocessDocument(articleNodeContent, articleSlug, assets, [], {});
        expect(assets).toStrictEqual(articleNodeContent.static_assets);
        postprocessDocument(imageNodeContent, imageSlug, assets, [], {});
        // No assets added, but should keep old assets
        expect(assets).toStrictEqual(articleNodeContent.static_assets);
    });

    it('should properly add a page to the in-memory page array', () => {
        const pages = [];
        postprocessDocument(articleNodeContent, articleSlug, [], pages, {});
        expect(pages).toStrictEqual([articleSlug]);
    });

    it('should not add an image to the in-memory page array', () => {
        const pages = [];
        postprocessDocument(imageNodeContent, imageSlug, [], pages, {});
        expect(pages).toStrictEqual([]);
    });

    it('should properly update the in-memory REF_DOC_MAPPING array', () => {
        const mapping = {};
        postprocessDocument(articleNodeContent, articleSlug, [], [], mapping);
        postprocessDocument(imageNodeContent, imageSlug, [], [], mapping);
        expect(mapping[articleSlug]).toStrictEqual(articleNodeContent);
        // Should still contain non-page content nodes in __refDocMapping
        expect(mapping[imageSlug]).toStrictEqual(imageNodeContent);
    });
});
