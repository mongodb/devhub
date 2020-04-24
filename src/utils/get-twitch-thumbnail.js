import greenPatternImage from '../images/2x/pattern-green@2x.png';

const MEDIA_WIDTH = '550';
const SIZE_TOKEN = '%{width}x%{height}';
const SIZE_TOKEN_ALT = '{width}x{height}';

const getTwitchThumbnail = (url, width = MEDIA_WIDTH, height = MEDIA_WIDTH) => {
    if (!url) {
        return greenPatternImage;
    }
    const containsSpace = url.match(SIZE_TOKEN);
    const dimensionsMatcher = containsSpace ? SIZE_TOKEN : SIZE_TOKEN_ALT;
    return url.replace(dimensionsMatcher, `${width}x${height}`);
};

export default getTwitchThumbnail;
