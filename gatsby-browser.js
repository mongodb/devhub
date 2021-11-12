import React from 'react';
import dlv from 'dlv';
import { hasAnchorLink } from '~utils/has-anchor-link';
import { isNewPage } from '~utils/is-new-page';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '~components/dev-hub/theme';
import SurveyBanner from '~components/dev-hub/survey-banner';

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
    const prevLocation = dlv(prevRouterProps, ['location'], {});
    const newLocation = dlv(routerProps, ['location'], {});
    return isNewPage(prevLocation, newLocation) || hasAnchorLink(newLocation);
};

export const wrapPageElement = ({ element }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            {element}
            <SurveyBanner></SurveyBanner>
        </ThemeProvider>
    );
};
