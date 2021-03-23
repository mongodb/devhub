export const transformAuthorStrapiData = author => ({
    ...author,
    author_image: author.image.url,
});
