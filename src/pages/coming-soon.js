import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { H1 } from '../components/dev-hub/text';
import Logo from '../components/dev-hub/icons/mdb-leaf';
import {
    size,
    colorMap,
    lineHeight,
    screenSize,
    fontSize,
} from '../components/dev-hub/theme';

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
        line-height: ${lineHeight.default};
        margin: 0;
        padding: 0;
    }
    main > section {
        padding: ${size.large} 120px;
        @media ${screenSize.upToLarge} {
            padding: ${size.medium};
        }
    }
`;

const Page = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    max-width: ${size.maxWidth};
    min-height: 100vh;
`;

export default () => (
    <Page>
        <Global styles={globalStyles} />
        <Logo height={70} />
        <H1>Coming Soon</H1>
    </Page>
);
