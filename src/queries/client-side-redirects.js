export const buildTimeClientSideRedirects = `
query BuildTimeClientsideRedirects {
  allStrapiClientSideRedirects {
    nodes {
      fromPath
      isPermanent
      toPath
    }
  }
}
`;
