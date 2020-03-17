import { create } from '@storybook/theming/create';
import { colorMap, FORM_ELEMENT_BORDER } from '../src/components/dev-hub/theme';

export default create({
    base: colorMap.pageBackground,

    colorPrimary: 'hotpink',
    colorSecondary: 'deepskyblue',

    // UI
    appBg: colorMap.pageBackground,
    appContentBg: colorMap.devBlack,
    appBorderColor: colorMap.greyLightOne,
    appBorderRadius: 4,

    // Typography
    fontBase: `akzidenz, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', "Segoe UI Emoji",
            "Segoe UI Symbol"`,

    // Text colors
    textColor: '#fff',
    textInverseColor: colorMap.devWhite,

    // Toolbar default and active colors
    barTextColor: '#fff',
    barSelectedColor: colorMap.devBlack,
    barBg: colorMap.greyDarkThree,

    // Form colors
    inputBg: colorMap.greyDarkTwo,
    inputBorder: `${FORM_ELEMENT_BORDER} solid transparent`,
    inputTextColor: '#fff',
    inputBorderRadius: 4,

    brandTitle: 'MongDB Dev-Hub',
    //   brandImage: 'https://placehold.it/350x150',
});
