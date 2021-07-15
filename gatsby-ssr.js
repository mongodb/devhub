import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '~components/dev-hub/theme';
import SurveyBanner from '~components/dev-hub/survey-banner';
import { AuthenticationProvider } from '~components/dev-hub/SSO';

export const wrapPageElement = ({ element }) => (
    <AuthenticationProvider>
        <ThemeProvider theme={darkTheme}>
            {element}
            <SurveyBanner></SurveyBanner>
        </ThemeProvider>
    </AuthenticationProvider>
);
