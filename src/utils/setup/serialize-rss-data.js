const serializeRssData = ({ query: { site, allArticle } }) =>
    allArticle.nodes.map(article => ({
        date: article.pubdate,
        description: article.description,
        title: article.title,
        url: site.siteMetadata.siteUrl + article.slug,
    }));

module.exports = { serializeRssData };
