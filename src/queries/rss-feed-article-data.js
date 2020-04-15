const rssFeedArticleData = `
    query RSSFeedArticleData {
        allArticle {
            nodes {
                slug: id
            }
        }
    }
`;

module.exports = { rssFeedArticleData };
