const pages = `
    query Pages {
        allArticle {
            nodes {
                slug: id
            }
        }
    }
`;

module.exports = { pages };
