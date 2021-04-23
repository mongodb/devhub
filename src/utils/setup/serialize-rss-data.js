const typeMap = {
    Article: 'article',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

const serializeRssData = ({ query: { site, allArticle, allStrapiArticles } }) =>
    allStrapiArticles.nodes
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
        );

module.exports = { serializeRssData };
