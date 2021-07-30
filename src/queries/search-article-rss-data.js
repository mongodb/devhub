const searchArticleRSSData = `
    query searchArticleRSSData {
        allArticle {
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
