const serializeRssData = ({ query: { site, allArticle } }) =>
    allArticle.map(article => ({
        description: article.description,
        title: article.title,
        url: site.siteMetadata.siteUrl + article.slug,
    }));

module.exports = { serializeRssData };
