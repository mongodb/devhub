import { postprocessDocument } from '../../src/utils/setup/postprocess-document';

describe('Should properly postprocess a document node after it is fetched', () => {
    const pageIdPrefix = 'test-pages/test';
    const articleSlug = 'article/test-article';
    const articleNode = {
        ast: {
            children: [],
        },
        filename: `${articleSlug}.txt`,
        page_id: `${pageIdPrefix}/${articleSlug}`,
    };
    const imageSlug = 'image/test-image';
    const imageNode = {
        ast: {
            children: [],
        },
        filename: `${imageSlug}.png`,
        page_id: `${pageIdPrefix}/${imageSlug}`,
    };

    it('should properly update the in-memory REF_DOC_MAPPING array without the pageIdPrefix', () => {
        const mapping = {};
        const { page_id: articlePageId, ...articleContentNode } = articleNode;
        const { page_id: imagePageId, ...imageContentNode } = imageNode;
        postprocessDocument(articleNode, pageIdPrefix, mapping);
        postprocessDocument(imageNode, pageIdPrefix, mapping);
        // refDocMapping should not include page_id, but should contain everything else
        expect(mapping[articleSlug]).toStrictEqual(articleContentNode);
        // Should still contain non-page content nodes in __refDocMapping
        expect(mapping[imageSlug]).toStrictEqual(imageContentNode);
    });
});
