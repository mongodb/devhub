const generateTrackingParam = page => `?tck=feat${page}`;

export const getFeaturedCardFields = (article, page) => {
    if (!article) {
        return {
            image: null,
            slug: null,
            title: null,
            description: null,
            tags: null,
        };
    }
    const allProducts = article.products || [];
    const allLanguages = article.languages || [];
    const allTags = article.tags || [];
    return {
        image: article.image,
        slug: article.slug + generateTrackingParam(page),
        title: article.title,
        description: article.description,
        tags: [...allProducts, ...allLanguages, ...allTags],
    };
};
