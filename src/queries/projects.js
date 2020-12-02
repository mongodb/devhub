export const projects = `
  query Projects {
    allStrapiProjects {
      nodes {
        students {
          bio {
            name
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
        }
      }
    }
  }
`;
