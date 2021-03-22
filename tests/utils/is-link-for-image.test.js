import { isLinkForImage } from '../../src/utils/is-link-for-image';

it('should identify links that lead to images', () => {
    // Null
    expect(isLinkForImage(null)).toBe(false);
    expect(isLinkForImage('')).toBe(false);
    // Easy case
    expect(isLinkForImage('some_image.jpg')).toBe(true);
    expect(isLinkForImage('/foo/bar/new_image.png')).toBe(true);
    // Odd true case
    expect(isLinkForImage('/foo/bar/new_image.png.new_image.jpg')).toBe(true);
    // False case
    expect(isLinkForImage('/foo/bar.html')).toBe(false);
    expect(isLinkForImage('/foo/.png/')).toBe(false);
    // Odd false case
    expect(isLinkForImage('/foo/bar/new_image.png.new_image')).toBe(false);
});
