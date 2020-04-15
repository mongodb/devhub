const articles = `
    query Pages {
        allArticle {
            nodes {
                slug: id
            }
        }
    }
`;

module.exports = { articles };
