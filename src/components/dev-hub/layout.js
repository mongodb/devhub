import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import GlobalNav from './global-nav';
import GlobalFooter from './global-footer';
import { colorMap, fontSize, lineHeight, screenSize, size } from './theme';

import '../../styles/font.css';
import 'typeface-fira-mono';

const globalStyles = css`
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
        background: ${colorMap.pageBackground};
        color: ${colorMap.devWhite};
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
    min-height: calc(100vh - 300px);
`;

const GlobalWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    max-width: ${size.maxWidth};
    min-height: 100vh;
`;
export const StorybookLayout = ({ children }) => {
    return (
        <GlobalWrapper>
            <Global styles={globalStyles} />
            <main>{children}</main>
        </GlobalWrapper>
    );
};

export default ({ children }) => (
    <GlobalWrapper>
        <Global styles={globalStyles} />
        <GlobalNav />
        <Main>{children}</Main>
        <GlobalFooter />
    </GlobalWrapper>
);
