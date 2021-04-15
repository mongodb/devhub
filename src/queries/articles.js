const articles = `
    query Pages {
        allArticle {
            nodes {
                associations
                slug: id
                timeToRead
            }
        }
    }
`;

const singleArticleQuery = `
    query SingleArticle($slug: String!) {
        article(id: { eq: $slug }) {
            timeToRead
        }
    }
`;

module.exports = { articles, singleArticleQuery };
