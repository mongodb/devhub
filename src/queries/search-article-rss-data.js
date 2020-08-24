const searchArticleRSSData = `
    query searchArticleRSSData {
        allArticle(sort: {fields: pubdate, order: DESC}) {
            nodes {
              authors {
                name
              }
                slug: id
                description
                pubdate
                tags
                title
                type
            }
        }
    }
`;

module.exports = { searchArticleRSSData };
