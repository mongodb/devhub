const rssFeedArticleData = `
    query RSSFeedArticleData {
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
