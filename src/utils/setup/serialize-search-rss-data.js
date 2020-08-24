const serializeSearchRssData = ({ query: { site, allArticle } }) =>
    allArticle.nodes.map(article => {
        const authorNames = article.authors.map(a => a.name);
        return {
            custom_elements: [
                { type: article.type },
                ...authorNames.map(a => ({ author_name: a })),
            ],
            categories: article.tags,
            date: article.pubdate,
            description: article.description,
            title: article.title,
            url: `${site.siteMetadata.siteUrl}/${article.slug}`,
        };
    });

module.exports = { serializeSearchRssData };
