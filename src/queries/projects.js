export const projects = `
  query Projects {
    allStrapiProjects {
      ...ProjectFragment
    }
  }
`;

// Currently, fragments are not supported in gatsby-node
// https://github.com/gatsbyjs/gatsby/discussions/12155
export const buildTimeProjects = `
query Projects {
    allStrapiProjects {
      nodes {
        students {
          bio {
            name
            bio
            image {
              url
            }
            linkedin_url
            youtube_url
          }
        }
        info {
          contents
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
        }
        name
        github_url
        project_link
        published_at
        updatedAt
      }
    }
  }
`;
