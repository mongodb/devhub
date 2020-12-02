export const students = `
  query Students {
    allStrapiStudentSpotlightEntries {
      nodes {
        id
        projects {
          info {
            name
          }
        }
        bio {
          bio
          email
          name
        }
      }
    }
  }
`;
