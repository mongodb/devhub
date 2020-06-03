import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { colorMap, fontSize, lineHeight, screenSize, size } from './theme';
import DevLeafMobile from './icons/mdb-dev-leaf-mobile';
import DevLeafDesktop from './icons/mdb-dev-leaf-desktop';
import useMedia from '../../hooks/use-media';

// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';

const GlobalNav = styled('nav')`
    background-color: ${colorMap.greyDarkThree};
    display: flex;
    flex-direction: column;
    width: 100%;
    &:after {
        background: radial-gradient(circle, #3ebb8c 0%, #76d3b1 100%);
        content: ' ';
        height: 2px;
        width: 100%;
    }
`;

const NavContent = styled('div')`
    align-items: center;
    color: ${colorMap.greyLightOne};
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: ${size.maxWidth};
    width: 100%;
`;

const NavLink = styled(Link)`
    font-size: ${fontSize.small};
    font-weight: 300;
    letter-spacing: 1px;
    line-height: ${lineHeight.small};
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge};
    text-decoration: none;
    &:hover,
    &[aria-current='page'] {
        /* greyDarkTwo at 40% opacity on greyDarkThree */
        background-color: #2c3d47;
    }
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.xlarge};
        padding: ${size.small} ${size.default};
    }
`;
const HomeLink = styled(NavLink)`
    align-items: center;
    display: flex;
    padding: ${LINK_VERTICAL_PADDING} ${size.xlarge} ${LINK_VERTICAL_PADDING}
        ${size.medium};
    &:hover,
    &[aria-current='page'] {
        background-color: unset;
    }
    @media ${screenSize.upToMedium} {
        padding: ${size.default};
        svg {
            /* align svg with other nav links */
            margin-top: -4px;
            width: 100px;
        }
    }
`;

export default () => {
    const isMobile = useMedia(screenSize.upToMedium);
    return (
        <GlobalNav>
            <NavContent>
                <HomeLink aria-label="Home" to="/">
                    {isMobile ? (
                        <DevLeafMobile width={size.xxlarge} />
                    ) : (
                        <DevLeafDesktop />
                    )}
                </HomeLink>
                <NavLink to="/learn">Learn</NavLink>
                <NavLink href="https://developer.mongodb.com/community/forums/">
                    Community
                </NavLink>
            </NavContent>
        </GlobalNav>
    );
};
