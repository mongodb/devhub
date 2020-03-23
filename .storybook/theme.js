import { create } from '@storybook/theming/create';
import { colorMap, FORM_ELEMENT_BORDER } from '../src/components/dev-hub/theme';

export default create({
    base: 'dark',

    // UI
    appBg: colorMap.pageBackground,
    appContentBg: colorMap.devBlack,
    appBorderColor: colorMap.greyLightOne,
    appBorderRadius: 4,

    // Typography
    fontBase: `"Fira Mono", monospace`,

    // Text colors
    textColor: colorMap.devWhite,

    // Toolbar default and active colors
    barTextColor: colorMap.devWhite,
    barSelectedColor: colorMap.teal,
    barBg: colorMap.greyDarkThree,

    // Form colors
    inputBg: colorMap.greyDarkTwo,
    inputBorder: `${FORM_ELEMENT_BORDER} solid transparent`,
    inputTextColor: colorMap.devWhite,
    inputBorderRadius: 4,

    brandTitle: 'MongDB Dev-Hub',
});
