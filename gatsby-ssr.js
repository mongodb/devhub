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

/**
 * Solution for issues with Gatsby SSR / SSG + React Helmet
 * https://github.com/gatsbyjs/gatsby/issues/9979#issuecomment-627344993
 */
export const onPreRenderHTML = ({
    getHeadComponents,
    replaceHeadComponents,
}) => {
    const headComponents = getHeadComponents();
    headComponents.sort((a, b) => {
        if (a.type === b.type || (a.type !== 'style' && b.type !== 'style')) {
            return 0;
        }

        if (a.type === 'style') {
            return 1;
        } else if (b.type === 'style') {
            return -1;
        }

        return 0;
    });

    replaceHeadComponents(headComponents);
};

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <script src="https://cdn.optimizely.com/js/15508090763.js"></script>,
    ]);
};
