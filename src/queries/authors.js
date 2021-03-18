export const buildTimeAuthors = `
query Authors {
    allStrapiAuthors {
      nodes {
        Name
        Bio
        Image {
          url
        }
        Location
        Title
      }
    }
  }
`;
