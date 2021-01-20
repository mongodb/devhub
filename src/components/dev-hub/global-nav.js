import React, { useCallback, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import DevLeafDesktop from './icons/mdb-dev-leaf-desktop';
import DevLeafMobile from './icons/mdb-dev-leaf-mobile';
import Link from '../Link';
import { fontSize, layer, lineHeight, screenSize, size } from './theme';
import useMedia from '~hooks/use-media';
import NavItem, { MobileNavItem } from './nav-item';
import MenuToggle from './menu-toggle';

const GREEN_BORDER_SIZE = '2px';
const MOBILE_NAV_BREAK = screenSize.upToLarge;
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
        height: ${GREEN_BORDER_SIZE};
        width: 100%;
    }
`;

const MobileNavMenu = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    position: absolute;
    /* Add 2px for green border to show */
    top: calc(100% + ${GREEN_BORDER_SIZE});
    width: 100%;
    z-index: ${layer.front};
`;

const NavContent = styled('div')`
    align-items: center;
    color: ${({ theme }) => theme.colorMap.greyLightOne};
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: ${size.maxWidth};
    position: relative;
    width: 100%;
    @media ${MOBILE_NAV_BREAK} {
        justify-content: space-between;
        padding-right: ${size.medium};
    }
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

const topNavItems = graphql`
    query TopNavItems {
        strapiTopNav {
            items {
                ...topNavItem
            }
        }
    }
`;

const MobileItems = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    return (
        <>
            <MenuToggle isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            {isOpen && (
                <MobileNavMenu>
                    {items.map(item => (
                        <MobileNavItem key={item.name} item={item} />
                    ))}
                </MobileNavMenu>
            )}
        </>
    );
};

export default () => {
    const data = useStaticQuery(topNavItems);
    const items = dlv(data, ['strapiTopNav', 'items'], []);
    const isMobile = useMedia(MOBILE_NAV_BREAK);
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
                {isMobile ? (
                    <MobileItems items={items} />
                ) : (
                    items.map(item => <NavItem item={item} />)
                )}
            </NavContent>
        </GlobalNav>
    );
};
