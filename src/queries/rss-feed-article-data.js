const rssFeedArticleData = `
    query RSSFeedArticleData {
        allStrapiArticles {
          nodes {
            description
            slug
            pubdate: published_at
            title: name
            type
          }
        }
    }
`;

module.exports = { rssFeedArticleData };
