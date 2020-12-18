export const projects = `
  query Projects {
    allStrapiProjects {
      nodes {
        students {
          bio {
            name
            image {
              url
            }
          }
        }
        info {
          name
          slug
          image {
            url
          }
        }
      }
    }
  }
`;
