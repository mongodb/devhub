import { transformAuthorStrapiData } from '../../src/utils/setup/transform-author-strapi-data';

it('should properly transform Strapi Authors to Snooty Authors', () => {
    const name = 'Test Name';
    const bio = 'Test Bio';
    const location = 'Test Location';
    const title = 'Test Title';
    const imageURL = 'Test Image URL';
    const image = { url: imageURL };
    const sampleStrapiAuthor = {
        bio,
        image,
        location,
        name,
        title,
    };
    const resultAuthor = transformAuthorStrapiData(sampleStrapiAuthor);
    expect(resultAuthor.name).toBe(sampleStrapiAuthor.name);
    expect(resultAuthor.bio).toBe(sampleStrapiAuthor.bio);
    expect(resultAuthor.location).toBe(sampleStrapiAuthor.location);
    expect(resultAuthor.title).toBe(sampleStrapiAuthor.title);
    expect(resultAuthor.author_image).toBe(sampleStrapiAuthor.image.url);
});
