export const projects = `
  query Projects {
    allStrapiProjects {
      ...ProjectFragment
    }
  }
`;

export const buildTimeProjects = `
query Projects {
    allStrapiProjects {
      nodes {
        students {
          bio {
            name
            image {
              url
            }
            linkedin_url
            youtube_url
          }
        }
        info {
          contents
          languages {
            language
          }
          products {
            product
          }
          tags {
            tag
          }
          name
          slug
          image {
            url
          }
        }
        project_link
        published_at
        updatedAt
      }
    }
  }
`;
