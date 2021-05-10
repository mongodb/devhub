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
        id
        authors {
          name
          bio
          location
          title
          image {
            url
          }
        }
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
        related_content {
          label
          url
        }
        SEO {
          canonical_url
          meta_description
          og_description
          og_image {
            url
          }
          og_type
          og_url
          twitter_creator
          twitter_description
          twitter_image {
            url
          }
        }
      }
    }
  }
`;
