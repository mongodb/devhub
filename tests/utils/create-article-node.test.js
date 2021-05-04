import { createArticleNode } from '../../src/utils/setup/create-article-node';

describe('Should properly postprocess an article node after it is fetched', () => {
    const pageIdPrefix = 'test-pages/test';
    const articleAuthors = [{ name: 'Author One' }, { name: 'Author Two' }];
    const articleDescription = 'Article Description';
    const articleLanguages = ['Python'];
    const articleProducts = ['MongoDB'];
    const articlePubdate = '2030-01-01';
    const articleRawContent = 'Raw content';
    const articleSlug = 'article/test-article';
    const articleTags = ['first-tag', 'second-tag'];
    const articleTitle = 'Test Article';
    const articleType = 'quickstart';
    const atfimage = '/path/toimage';
    const articleNode = {
        ast: {
            children: [],
        },
        query_fields: {
            'atf-image': atfimage,
            author: articleAuthors,
            languages: articleLanguages,
            'meta-description': [{ type: 'text', value: articleDescription }],
            products: articleProducts,
            pubdate: articlePubdate,
            tags: articleTags,
            title: [{ type: 'text', value: articleTitle }],
            type: articleType,
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
            mapping,
            articleRawContent,
            []
        );
        createArticleNode(
            imageNode,
            pageIdPrefix,
            createNode,
            createContentDigest,
            mapping,
            articleRawContent,
            []
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
            {},
            articleRawContent,
            []
        );
        expect(createNode.mock.calls.length).toBe(1);
        const createdArticleNode = createNode.mock.calls[0][0];
        expect(createdArticleNode.id).toBe(articleSlug);
        expect(createdArticleNode.internal.type).toBe('Article');
        expect(createdArticleNode.title).toBe(articleTitle);
        expect(createdArticleNode.description).toBe(articleDescription);
        expect(createdArticleNode.pubdate).toBe(articlePubdate);
        expect(createdArticleNode.rawContent).toBe(articleRawContent);

        expect(createdArticleNode.internal.contentDigest).not.toBeUndefined();
        expect(createContentDigest.mock.calls.length).toBe(1);
        const contentToDigest = {
            atfimage,
            authors: articleAuthors,
            description: articleDescription,
            languages: articleLanguages,
            products: articleProducts,
            pubdate: articlePubdate,
            rawContent: articleRawContent,
            tags: articleTags,
            title: articleTitle,
            type: articleType,
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
            {},
            []
        );
        expect(createNode.mock.calls.length).toBe(0);
    });
});
