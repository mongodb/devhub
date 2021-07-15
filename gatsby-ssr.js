import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { AuthenticationProvider } from '~components/dev-hub/SSO';
import SurveyBanner from '~components/dev-hub/survey-banner';
import { darkTheme } from '~components/dev-hub/theme';

export const wrapPageElement = ({ element }) => (
    <AuthenticationProvider>
        <ThemeProvider theme={darkTheme}>
            {element}
            <SurveyBanner></SurveyBanner>
        </ThemeProvider>
    </AuthenticationProvider>
);
