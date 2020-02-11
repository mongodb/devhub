import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { colorMap, lineHeight, screenSize, size } from './theme';
import Leaf from './mdb-leaf';

const GlobalNav = styled('nav')`
    align-items: center;
    background-color: #21313c;
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
    line-height: ${lineHeight.h2};
    padding: ${size.small} ${size.xlarge};
    text-decoration: none;
    &:hover,
    &[aria-current='page'] {
        background-color: ${colorMap.devBlack};
    }
    @media ${screenSize.upToMedium} {
        padding: ${size.small} ${size.default};
    }
`;
const HomeLink = styled(NavLink)`
    align-items: center;
    display: flex;
    padding-left: ${size.medium};
    svg {
        margin-right: ${size.medium};
    }
`;

export default () => {
    return (
        <GlobalNav>
            <HomeLink to="/">
                <Leaf width={size.medium} /> Developers
            </HomeLink>
            <NavLink to="/learn">Learn</NavLink>
            <NavLink to="/community">Community</NavLink>
        </GlobalNav>
    );
};
