export const buildTimeAuthors = `
query Authors {
    allStrapiAuthors {
      nodes {
        name
        bio
        image {
          url
        }
        location
        title
      }
    }
  }
`;
