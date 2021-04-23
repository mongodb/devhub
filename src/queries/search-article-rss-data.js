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
        allStrapiArticles(sort: {fields: published_at, order: DESC}) {
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
