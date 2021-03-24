const searchArticleRSSData = `
    query searchArticleRSSData {
        allArticle(sort: {fields: pubdate, order: DESC}) {
            nodes {
              authors {
                name
              }
                atfimage
                slug: id
                description
                languages
                products
                pubdate
                rawContent
                tags
                title
                type
            }
        }
    }
`;

module.exports = { searchArticleRSSData };
