import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '~components/dev-hub/theme';
import SurveyBanner from '~components/dev-hub/survey-banner';

export const wrapPageElement = ({ element }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            {element}
            <SurveyBanner></SurveyBanner>
        </ThemeProvider>
    );
};

// export const onRenderBody = ({ setHeadComponents }) => {
//     setHeadComponents([
//         <script src="https://cdn.optimizely.com/js/15508090763.js"></script>,
//     ]);
// };
