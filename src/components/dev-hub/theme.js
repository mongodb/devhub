/**
 * @type {Object.<string, string>}
 * @property {string} fontsize returns px value
 */
const fontSize = {
    micro: '8px',
    xsmall: '10px',
    tiny: '12px',
    small: '14px',
    default: '16px',
    h1: '48px',
    h2: '30px',
    h3: '24px',
    h4: '20px',
    tabNav: '10px',
};
/**
 * @type {Object}
 * @property {string} size returns px value
 * @property {function(string): number} stripUnit removes px unit
 */
const size = {
    tiny: '5px',
    small: '10px',
    default: '16px',
    medium: '20px',
    large: '32px',
    xlarge: '64px',
    xxlarge: '128px',
    maxWidth: '1400px',
};
const colorMap = {
    black: '#1B272D',
    darkGreen: '#13AA52',
    devBlack: '#1a282e',
    devWhite: '#e3ecea',
    greyDarkOne: '#5B6D75',
    greyDarkTwo: '#3A5058',
    greyDarkThree: '#2A3D46',
    greyLightOne: '#E3ECEA',
    greyLightTwo: '#B4C4C1',
    greyLightThree: '#85979A',
    lightGreen: '#0AD05B',
    orange: '#ED7E22',
    magenta: '#CD509B',
    salmon: '#E55F55',
    teal: '#2F9FC5',
    violet: '#6E60F9',
    white: '#FFFFFF',
    yellow: '#FDDC49',
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
    back: 1,
    middle: 11,
    front: 21,
    superFront: 22,
};

const FORM_ELEMENT_BORDER = '2px';

export { colorMap, fontSize, FORM_ELEMENT_BORDER, layer, screenSize, size };
