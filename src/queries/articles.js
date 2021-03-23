export const articles = `
    query Pages {
        allArticle {
            nodes {
                slug: id
            }
        }
    }
`;

export const buildTimeArticles = `
query Articles {
    allStrapiArticles {
      nodes {
          content
          type
          description
          languages {
            language
          }
          products {
            product
          }
          tags {
            tag
          }
          slug
          image {
            url
          }
        name
        published_at
        updatedAt
      }
    }
  }
`;
