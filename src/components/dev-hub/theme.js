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
    h1: '42px',
    h2: '36px',
    h3: '30px',
    h4: '24px',
    h5: '20px',
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
    h1: '54px',
    h2: '48px',
    h3: '42px',
    h4: '36px',
    h5: '32px',
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
    large: '32px',
    xlarge: '64px',
    xxlarge: '128px',
    maxWidth: '1440px',
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
    orange: '#ED7E22',
    magenta: '#CD509B',
    pageBackground: '#061621',
    salmon: '#E55F55',
    sherbet: '#F7A76F',
    teal: '#2F9FC5',
    violet: '#6E60F9',
    white: '#F9FBFA',
    yellow: '#FDDC49',
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
    greenTealReverse: `linear-gradient(
        270deg,
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
    greenTealReverse: `
        border: 2px solid;
        border-image: ${gradientMap.greenTealReverse};
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
    upToXSmall: 'only screen and (max-width: 374px)',
    xSmallAndUp: 'not all and (max-width: 374px)',
    upToSmall: 'only screen and (max-width: 420px)',
    smallAndUp: 'not all and (max-width: 420px)',
    upToMedium: 'only screen and (max-width: 767px)',
    mediumAndUp: 'not all and (max-width: 767px)',
    upToLarge: 'only screen and (max-width: 1023px)',
    largeAndUp: 'not all and (max-width: 1023px)',
};

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

export {
    animationSpeed,
    borderGradients,
    colorMap,
    fontSize,
    FORM_ELEMENT_BORDER,
    gradientMap,
    layer,
    lineHeight,
    screenSize,
    size,
};
