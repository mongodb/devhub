const searchArticleRSSData = `
    query searchArticleRSSData {
        allStrapiArticles {
          nodes {
            image {
              url
            }
            authors {
              name
            }
            languages {
              language
            }
            description
            content
            slug
            type
            updatedAt
            published_at
            products {
              product
            }
            name
          }
        }
    }
`;

module.exports = { searchArticleRSSData };
