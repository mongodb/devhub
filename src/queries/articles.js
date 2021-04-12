const articles = `
    query Pages {
        allArticle {
            nodes {
                slug: id
                timeToRead
            }
        }
    }
`;

module.exports = { articles };
