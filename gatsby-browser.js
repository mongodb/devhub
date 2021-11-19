import React from 'react';
import dlv from 'dlv';
import { hasAnchorLink } from '~utils/has-anchor-link';
import { isNewPage } from '~utils/is-new-page';
import { ThemeProvider } from '@emotion/react';
import { AuthenticationProvider } from '~components/dev-hub/SSO';
import SurveyBanner from '~components/dev-hub/survey-banner';
import { darkTheme } from '~components/dev-hub/theme';

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
    const prevLocation = dlv(prevRouterProps, ['location'], {});
    const newLocation = dlv(routerProps, ['location'], {});
    return isNewPage(prevLocation, newLocation) || hasAnchorLink(newLocation);
};

export const wrapPageElement = ({ element }) => (
    <AuthenticationProvider>
        <ThemeProvider theme={darkTheme}>
            {element}
            <SurveyBanner></SurveyBanner>
        </ThemeProvider>
    </AuthenticationProvider>
);
