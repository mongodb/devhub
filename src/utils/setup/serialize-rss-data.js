const typeMap = {
    Article: 'article',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

const serializeRssData = ({
    query: { site, allArticle, allStrapiArticles },
}) => {
    const strapiArticles = allStrapiArticles ? allStrapiArticles.nodes : [];
    return strapiArticles
        .map(article => {
            const slug = `${typeMap[article.type]}${article.slug}`;
            article.slug = slug;
            return {
                date: article.pubdate,
                description: article.description,
                title: article.title,
                url: `${site.siteMetadata.siteUrl}/${article.slug}`,
            };
        })
        .concat(
            allArticle.nodes.map(article => ({
                date: article.pubdate,
                description: article.description,
                title: article.title,
                url: `${site.siteMetadata.siteUrl}/${article.slug}`,
            }))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
};

module.exports = { serializeRssData };
