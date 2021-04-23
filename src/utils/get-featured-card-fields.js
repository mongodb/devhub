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
    return {
        image: article.image,
        slug: article.slug + generateTrackingParam(page),
        title: article.title,
        description: article.description,
        tags: [...article.products, ...article.languages, ...article.tags],
    };
};
