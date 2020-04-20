import { createArticleNode } from '../../src/utils/setup/create-article-node';

describe('Should properly postprocess an article node after it is fetched', () => {
    const pageIdPrefix = 'test-pages/test';
    const articleDescription = 'Article Description';
    const articlePubdate = '2030-01-01';
    const articleSlug = 'article/test-article';
    const articleTitle = 'Test Article';
    const articleNode = {
        ast: {
            children: [],
        },
        query_fields: {
            'meta-description': [{ type: 'text', value: articleDescription }],
            pubdate: articlePubdate,
            title: [{ type: 'text', value: articleTitle }],
        },
        filename: `${articleSlug}.txt`,
        page_id: `${pageIdPrefix}/${articleSlug}`,
    };
    const imageSlug = 'image/test-image';
    const imageNode = {
        ast: {
            children: [],
        },
        query_fields: {
            title: 'title',
        },
        filename: `${imageSlug}.png`,
        page_id: `${pageIdPrefix}/${imageSlug}`,
    };

    let createNode;
    let createContentDigest;

    beforeEach(() => {
        createNode = jest.fn();
        createContentDigest = jest.fn(contentDigest => contentDigest);
    });

    it('should properly update the in-memory mapping from slugs to document content', () => {
        const mapping = {};
        createArticleNode(
            articleNode,
            pageIdPrefix,
            createNode,
            createContentDigest,
            mapping
        );
        createArticleNode(
            imageNode,
            pageIdPrefix,
            createNode,
            createContentDigest,
            mapping
        );
        // refDocMapping should not include page_id, but should contain everything else
        expect(mapping[articleSlug]).toStrictEqual(articleNode);
        // Should still contain non-page content nodes in __refDocMapping
        expect(mapping[imageSlug]).toStrictEqual(imageNode);
    });

    it('should properly create nodes for articles with proper content digests', () => {
        createArticleNode(
            articleNode,
            pageIdPrefix,
            createNode,
            createContentDigest,
            {}
        );
        expect(createNode.mock.calls.length).toBe(1);
        const createdArticleNode = createNode.mock.calls[0][0];
        expect(createdArticleNode.id).toBe(articleSlug);
        expect(createdArticleNode.internal.type).toBe('Article');
        expect(createdArticleNode.title).toBe(articleTitle);
        expect(createdArticleNode.description).toBe(articleDescription);
        expect(createdArticleNode.pubdate).toBe(articlePubdate);

        expect(createdArticleNode.internal.contentDigest).not.toBeUndefined();
        expect(createContentDigest.mock.calls.length).toBe(1);
        const contentToDigest = {
            title: articleTitle,
            pubdate: articlePubdate,
            description: articleDescription,
        };
        expect(createContentDigest.mock.calls[0][0]).toStrictEqual(
            contentToDigest
        );
    });

    it('should not create Article nodes for images/assets', () => {
        createArticleNode(
            imageNode,
            pageIdPrefix,
            createNode,
            createContentDigest,
            {}
        );
        expect(createNode.mock.calls.length).toBe(0);
    });
});
