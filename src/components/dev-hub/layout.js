import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';
import { colorMap, fontSize, lineHeight, size } from './theme';

const globalStyles = css`
    body {
        background: ${colorMap.devBlack};
        color: ${colorMap.devWhite};
        font-family: akzidenz, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        font-size: ${fontSize.default};
        line-height: ${lineHeight.default};
    }
`;

const GlobalWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    max-width: ${size.maxWidth};
    min-height: 100vh;
`;

const GlobalNav = styled('nav')`
    border-bottom: 1px solid ${colorMap.greyLightTwo};
    color: ${colorMap.greyLightOne};
    display: flex;
    justify-content: space-around;
    padding: ${size.default};
`;

const NavLink = styled(GatsbyLink)`
    color: ${colorMap.devWhite};
    padding: ${size.small};
    &[aria-current='page'] {
        background: ${colorMap.yellow};
        color: ${colorMap.greyDarkThree};
    }
`;

const GlobalFooter = styled('footer')`
    background: ${colorMap.devBlack};
    border-top: 1px solid ${colorMap.greyLightTwo};
    color: ${colorMap.greyLightOne};
    display: flex;
    justify-content: flex-start;
`;

const ContentWrapper = styled('main')`
    flex: 1;
    margin: ${size.large} 0;
`;

export const StorybookLayout = ({ children }) => {
    const storybookStyles = css`
        ${globalStyles};
        body {
            background: ${colorMap.devWhite};
            color: ${colorMap.devBlack};
        }
    `;
    return (
        <GlobalWrapper>
            <Global styles={storybookStyles} />
            <ContentWrapper>{children}</ContentWrapper>
        </GlobalWrapper>
    );
};

export default ({ children }) => (
    <GlobalWrapper>
        <Global styles={globalStyles} />
        <GlobalNav>
            <NavLink to="/">Developers</NavLink>
            <NavLink to="/learn">Learn</NavLink>
            <NavLink to="/community">Community</NavLink>
        </GlobalNav>
        <ContentWrapper>{children}</ContentWrapper>
        <GlobalFooter>
            <ul>
                <li>footer item</li>
            </ul>
        </GlobalFooter>
    </GlobalWrapper>
);
