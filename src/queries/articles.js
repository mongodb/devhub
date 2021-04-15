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

module.exports = { articles };
