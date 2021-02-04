export const findArticleWithSlug = (allArticles, slug) => {
    const targetSlug = new RegExp(`^/?${slug}$`);
    const targetArticle = allArticles.find(x =>
        x.query_fields.slug.match(targetSlug)
    );
    if (targetArticle) {
        targetArticle['type'] = 'article';
        return targetArticle;
    }
};
