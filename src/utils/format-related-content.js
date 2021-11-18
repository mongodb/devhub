export const formatRelatedContent = relatedContent => {
    return relatedContent
        ? relatedContent.map(({ label, url }) => ({
              name: 'reference',
              refuri: url,
              children: [{ value: label }],
          }))
        : [];
};
