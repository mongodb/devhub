import React from 'react';
import { ThemeProvider } from '@emotion/react';
import ErrorBoundary from '~components/dev-hub/error-boundary';
import { darkTheme } from '~components/dev-hub/theme';
import SurveyBanner from '~components/dev-hub/survey-banner';

export const wrapPageElement = ({ element }) => {
    return (
        <ErrorBoundary>
            <ThemeProvider theme={darkTheme}>
                {element}
                <SurveyBanner></SurveyBanner>
            </ThemeProvider>
        </ErrorBoundary>
    );
};
