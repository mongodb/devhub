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
          Type
          Description
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
        Name
        published_at
        updatedAt
      }
    }
  }
`;
