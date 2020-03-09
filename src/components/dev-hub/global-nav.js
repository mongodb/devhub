import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { colorMap, fontSize, lineHeight, screenSize, size } from './theme';
import Leaf from './icons/mdb-leaf';
import DevLeaf from './icons/mdb-dev-leaf';
import { withPrefix } from 'gatsby';

const GlobalNav = styled('nav')`
    align-items: center;
    background-color: ${colorMap.greyDarkThree};
    color: ${colorMap.greyLightOne};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    &:after {
        background: radial-gradient(circle, #3ebb8c 0%, #76d3b1 100%);
        content: ' ';
        height: 4px;
        width: 100%;
    }
`;

const NavLink = styled(Link)`
    font-weight: 300;
    letter-spacing: 1px;
    line-height: ${lineHeight.xxlarge};
    padding: ${size.small} ${size.xlarge};
    text-decoration: none;
    &:hover,
    &[aria-current='page'] {
        background-color: ${colorMap.devBlack};
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
    padding-left: ${size.medium};
    @media ${screenSize.upToMedium} {
        svg {
            /* align svg with other nav links */
            margin-top: -4px;
            width: 100px;
        }
    }
`;

export default () => {
    return (
        <GlobalNav>
            <HomeLink to="/">
                <DevLeaf width={size.xxlarge} />
            </HomeLink>
            <NavLink to="/learn">Learn</NavLink>
            <NavLink to="/community">Community</NavLink>
        </GlobalNav>
    );
};
