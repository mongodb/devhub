import { formatRelatedContent } from '../../src/utils/format-related-content';

it('should properly populate format to related_content to match the related-articles component format', () => {
    const relatedContent = [
        {
            url: 'https://www.foo.com',
            label: 'related: 1',
        },
        {
            url: 'https://www.bar.com',
            label: 'related: 2',
        },
    ];
    const formattedRelatedContent = formatRelatedContent(relatedContent);
    expect(formattedRelatedContent).toEqual([
        {
            name: 'reference',
            refuri: 'https://www.foo.com',
            children: [{ value: 'related: 1' }],
        },
        {
            name: 'reference',
            refuri: 'https://www.bar.com',
            children: [{ value: 'related: 2' }],
        },
    ]);
});
