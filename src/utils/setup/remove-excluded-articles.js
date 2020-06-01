export const removeExcludedArticles = (
    allArticles,
    excludedLearnPageArticles
) => {
    if (excludedLearnPageArticles && excludedLearnPageArticles.length) {
        const filteredArticles = allArticles.filter(
            article =>
                !excludedLearnPageArticles.find(excludedArticle =>
                    article.query_fields.slug.match(
                        new RegExp(`^/?${excludedArticle}$`)
                    )
                )
        );
        // Warn writers if not all excludes were found
        if (
            allArticles.length - excludedLearnPageArticles.length <
            filteredArticles.length
        ) {
            console.warn(
                'Not all articles requested were excluded from the learn page. Please double check article slugs for the page group.'
            );
        }
        return filteredArticles;
    }
    return allArticles;
};
