import React, { useMemo } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { TabProvider } from './tab-context';
import { Helmet } from 'react-helmet';
import GlobalNav from './global-nav';
import GlobalFooter from './global-footer';
import { darkTheme, fontSize, lineHeight, screenSize, size } from './theme';
import MongodbLiveBanner from './mongodb-live-banner';

import '../../styles/font.css';
import 'typeface-fira-mono';

const globalStyles = theme => css`
    html {
        box-sizing: border-box;
        height: 100%;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    body {
        background: ${theme.colorMap.pageBackground};
        color: ${theme.colorMap.devWhite};
        font-family: akzidenz, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        font-size: ${fontSize.default};
        line-height: ${lineHeight.medium};
        margin: 0;
        padding: 0;
    }
    main > section {
        padding: ${size.large} 120px;
        @media ${screenSize.upToLarge} {
            padding: ${size.medium};
        }
    }
    img {
        max-width: 100%;
    }
`;

const Main = styled('main')`
    /* ensure content takes up full space between header & footer*/
    margin: 0 auto;
    max-width: ${size.maxWidth};
    min-height: calc(100vh - 300px);
    width: 100%;
`;

const GlobalWrapper = styled('div')`
    background: ${({ theme }) => theme.colorMap.pageBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    width: 100%;
`;

export const StorybookLayout = ({ children }) => {
    const style = useMemo(() => globalStyles(darkTheme), []);
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalWrapper>
                <TabProvider>
                    <Global styles={style} />
                    <main>{children}</main>
                </TabProvider>
            </GlobalWrapper>
        </ThemeProvider>
    );
};

export default ({ children }) => {
    const style = useMemo(() => globalStyles(darkTheme), []);
    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalWrapper>
                <Helmet htmlAttributes={{ lang: 'en' }}>
                    <meta name="robots" content="index" />
                    <link
                        rel="shortcut icon"
                        href="https://www.mongodb.com/assets/images/global/favicon.ico"
                    />
                </Helmet>
                <Global styles={style} />
                <MongodbLiveBanner />
                <GlobalNav />
                <TabProvider>
                    <Main>{children}</Main>
                </TabProvider>
                <GlobalFooter />
            </GlobalWrapper>
        </ThemeProvider>
    );
};
