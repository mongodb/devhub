import { css } from '@emotion/react';

/**
 * @type {Object.<string, string>}
 * @property {string} fontsize returns px value
 */
const fontSize = {
    micro: '10px',
    xsmall: '12px',
    tiny: '14px',
    small: '16px',
    default: '18px',
    medium: '20px',
    large: '24px',
    xlarge: '30px',
    xxlarge: '36px',
    jumbo: '42px',
};
/**
 * @type {Object.<string, string>}
 * @property {string} lineHeight
 */
const lineHeight = {
    micro: '16px',
    xsmall: '18px',
    tiny: '20px',
    small: '24px',
    default: '28px',
    medium: '32px',
    large: '36px',
    xlarge: '42px',
    xxlarge: '48px',
    jumbo: '54px',
};
/**
 * @type {Object}
 * @property {string} size returns px value
 */
const size = {
    tiny: '5px',
    xsmall: '8px',
    small: '10px',
    default: '16px',
    medium: '20px',
    mediumLarge: '24px',
    articleContent: '30px',
    large: '32px',
    xlarge: '64px',
    xxlarge: '120px',
    maxContentWidth: '780px',
    maxWidth: '1440px',
    /** @type {function(string): number} */
    stripUnit(unit) {
        return parseInt(unit, 10);
    },
};

const colorMap = {
    darkGreen: '#13AA52',
    devBlack: '#0C1C27',
    devWhite: '#f9fbfa',
    greyDarkOne: '#5D6C74',
    greyDarkTwo: '#3D4F58',
    greyDarkThree: '#21313C',
    greyLightOne: '#E7EEEC',
    greyLightTwo: '#B8C4C2',
    greyLightThree: '#9FA1A2',
    lightGreen: '#0AD05B',
    orange: '#F97216',
    magenta: '#D34F94',
    pageBackground: '#061621',
    salmon: '#E55F55',
    sherbet: '#F7A76F',
    teal: '#2F9FC5',
    violet: '#6E60F9',
    purple: '#4F4FBF',
    yellow: '#FFDD49',
};

const gradientMap = {
    green: `linear-gradient(
        315deg,
        ${colorMap.lightGreen} 0%,
        ${colorMap.lightGreen} 40%,
        ${colorMap.darkGreen} 100%
    )`,
    greenTeal: `linear-gradient(
        270deg,
        ${colorMap.lightGreen} 0%,
        ${colorMap.teal} 100%
    )`,
    greenTealOffset: `linear-gradient(
        315deg,
        ${colorMap.teal} 0%,
        ${colorMap.lightGreen} 100%
    )`,
    magentaSalmonSherbet: `linear-gradient(
        270deg,
        ${colorMap.sherbet} 0%,
        ${colorMap.salmon} 49.99%,
        ${colorMap.magenta} 100%
    )`,
    magentaSalmonYellow: `linear-gradient(
        270deg,
        ${colorMap.yellow} 0%,
        ${colorMap.salmon} 49.99%,
        ${colorMap.magenta} 100%
    )`,
    tealViolet: `linear-gradient(
        270deg,
        ${colorMap.teal} 0%,
        ${colorMap.violet} 100%
    )`,
    tealVioletReverse: `linear-gradient(
        270deg,
        ${colorMap.violet} 0%,
        ${colorMap.teal} 100%
    )`,
    tealVioletPurple: `linear-gradient(
        320deg, 
        ${colorMap.teal} 0%, 
        ${colorMap.violet} 33.14%, 
        ${colorMap.purple} 100%
    )`,
    violetMagenta: `linear-gradient(
        270deg,
        ${colorMap.violet} 0%,
        ${colorMap.magenta} 100%
    )`,
    violentMagentaOrange: `linear-gradient(
        270deg,
        ${colorMap.violet} 0%,
        ${colorMap.magenta} 49.99%,
        ${colorMap.orange} 100%
    )`,
    violetMagentaReverse: `linear-gradient(
        270deg,
        ${colorMap.magenta} 0%,
        ${colorMap.violet} 100%
    )`,
};

const borderGradients = {
    greenTeal: `
        border: 2px solid;
        border-image: ${gradientMap.greenTeal};
        border-image-slice: 1;
    `,
    tealViolet: `
        border: 2px solid;
        border-image: ${gradientMap.tealViolet};
        border-image-slice: 1;
    `,
    tealVioletReverse: `
        border: 2px solid;
        border-image: ${gradientMap.tealVioletReverse};
        border-image-slice: 1;
    `,
    violetMagenta: `
        border: 2px solid;
        border-image: ${gradientMap.violetMagenta};
        border-image-slice: 1;
    `,
    violetMagentaReverse: `
        border: 2px solid;
        border-image: ${gradientMap.violetMagentaReverse};
        border-image-slice: 1;
    `,
};

/**
 * store common responsive sizes
 * @type {Object.<string, string>}
 */
const screenSize = {
    upToSmall: 'only screen and (max-width: 420px)',
    smallAndUp: 'not all and (max-width: 420px)',
    upToMedium: 'only screen and (max-width: 767px)',
    mediumAndUp: 'not all and (max-width: 767px)',
    upToLarge: 'only screen and (max-width: 1023px)',
    largeAndUp: 'not all and (max-width: 1023px)',
    upToSmallDesktop: 'only screen and (max-width: 1200px)',
    smallDesktopAndUp: 'not all and (max-width: 1200px)',
    upToXlarge: `only screen and (max-width: ${size.maxWidth})`,
    xlargeAndUp: `not all and (max-width: ${size.maxWidth})`,
};

const gridLayout = {
    desktop: {
        columnGap: '24px',
        numCols: 12,
        sideMargin: size.xxlarge,
    },
    mobile: {
        columnGap: size.default,
        numCols: 4,
        sideMargin: size.default,
    },
    tablet: {
        columnGap: size.default,
        numCols: 8,
        sideMargin: size.xlarge,
    },
};

const grid = css`
    display: grid;
    grid-template-columns: repeat(${gridLayout.desktop.numCols}, 1fr);
    column-gap: ${gridLayout.desktop.columnGap};
    margin: 0 ${gridLayout.desktop.sideMargin};
    @media ${screenSize.upToLarge} {
        grid-template-columns: repeat(${gridLayout.tablet.numCols}, 1fr);
        column-gap: ${gridLayout.tablet.columnGap};
        margin: 0 ${gridLayout.tablet.sideMargin};
    }
    @media ${screenSize.upToMedium} {
        grid-template-columns: repeat(${gridLayout.mobile.numCols}, 1fr);
        column-gap: ${gridLayout.mobile.columnGap};
        margin: 0 ${gridLayout.mobile.sideMargin};
    }
`;

/**
 * z-index values in ranges of 10. This should give enough leeway to incremement in components as needed.
 * @type {Object.<string, number>}
 * @property {string} position returns a z-index value
 */
const layer = {
    superBack: -1,
    back: 1,
    middle: 11,
    front: 21,
    superFront: 22,
};

/**
 * @type {Object.<string, string>}
 * @property {string} animationSpeed
 */
const animationSpeed = {
    slow: '650ms',
    medium: '300ms',
    fast: '150ms',
};

const FORM_ELEMENT_BORDER = '2px';

const HERO_CONTENT_WIDTH = '640px';

// Use colors with emotion theme
export const darkTheme = {
    borderGradients,
    colorMap,
    gradientMap,
};

export {
    animationSpeed,
    borderGradients,
    colorMap,
    fontSize,
    FORM_ELEMENT_BORDER,
    gradientMap,
    grid,
    HERO_CONTENT_WIDTH,
    layer,
    lineHeight,
    screenSize,
    size,
};
