const rssFeedArticleData = `
    query RSSFeedArticleData {
        allArticle {
            nodes {
                slug: id
                title
                description
            }
        }
    }
`;

module.exports = { rssFeedArticleData };
