const rssFeedArticleData = `
    query RSSFeedArticleData {
        allStrapiArticles(sort: {fields: published_at, order: DESC}) {
          nodes {
            description
            slug
            pubdate: published_at
            title: name
            type
          }
        }
        allArticle(sort: {fields: pubdate, order: DESC}) {
            nodes {
                slug: id
                description
                pubdate
                title
            }
        }
    }
`;

module.exports = { rssFeedArticleData };
