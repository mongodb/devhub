import React, { useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import DevLeafDesktop from './icons/mdb-dev-leaf-desktop';
import DevLeafMobile from './icons/mdb-dev-leaf-mobile';
import Link from '../Link';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';
import useMedia from '~hooks/use-media';

// nav height is 58px: 24px line height + 2 * 17px vertical padding
const LINK_VERTICAL_PADDING = '17px';

const GlobalNav = styled('nav')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
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
    color: ${({ theme }) => theme.colorMap.greyLightOne};
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

const NavListHeader = styled(NavLink)`
    position: relative;
`;
const NavItemList = styled('div')``;
const NavItemSublist = styled('ul')`
    background-color: red;
    display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
    list-style: none;
    margin-top: 2px;
    padding-left: 0;
    position: absolute;
    z-index: ${layer.front};
    > li {
        margin: 0;
        padding: 0;
    }
`;

const topNavItems = graphql`
    query TopNavItems {
        strapiTopNav {
            items {
                ...topNavItem
            }
        }
    }
`;

const NavItemSubItem = ({ subitem }) => (
    <NavLink to={subitem.url}>{subitem.name}</NavLink>
);

const NavItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubMenu = !!item.subitems.length;
    if (hasSubMenu) {
        const NavListHeaderDiv = NavListHeader.withComponent('div');
        return (
            <NavItemList
                onBlur={() => setIsExpanded(false)}
                onMouseLeave={() => setIsExpanded(false)}
                onMouseEnter={() => setIsExpanded(true)}
                onFocus={() => setIsExpanded(true)}
                tabIndex="0"
            >
                <NavListHeaderDiv>{item.name}</NavListHeaderDiv>
                <NavItemSublist isExpanded={isExpanded} tabIndex="0">
                    {item.subitems.map(subitem => (
                        <li tabIndex="0">
                            <NavItemSubItem tabIndex="0" subitem={subitem} />
                        </li>
                    ))}
                </NavItemSublist>
            </NavItemList>
        );
    }
    return <NavLink to={item.url}>{item.name}</NavLink>;
};

export default () => {
    const data = useStaticQuery(topNavItems);
    const items = dlv(data, ['strapiTopNav', 'items'], []);
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
                {items.map(item => (
                    <NavItem item={item} />
                ))}
            </NavContent>
        </GlobalNav>
    );
};
